const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  // Reference to Employee/User being reviewed
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employee is required']
  },

  // Reference to HR Officer/Admin conducting the review
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },

  // Performance rating (1-5 scale)
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },

  // Feedback/Comments
  feedback: {
    type: String,
    maxlength: [2000, 'Feedback cannot exceed 2000 characters']
  },

  // Review period (e.g., "Q1 2026", "January 2026")
  reviewPeriod: {
    type: String,
    required: [true, 'Review period is required']
  },

  // Categories/Metrics
  metrics: {
    quality: { type: Number, min: 1, max: 5 },
    productivity: { type: Number, min: 1, max: 5 },
    attendance: { type: Number, min: 1, max: 5 },
    teamwork: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 }
  },

  // Strengths
  strengths: {
    type: [String],
    default: []
  },

  // Areas for improvement
  areasForImprovement: {
    type: [String],
    default: []
  },

  // Goals for next period
  goals: {
    type: [String],
    default: []
  },

  // Recommendation (e.g., salary increase, promotion, etc.)
  recommendation: {
    type: String,
    enum: ['no-change', 'promotion', 'salary-increase', 'training-needed', 'performance-improvement-plan'],
    default: 'no-change'
  },

  // Review date (defaults to current date)
  date: {
    type: Date,
    default: Date.now
  },

  // Status
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewed', 'finalized'],
    default: 'draft'
  },

  // Visibility (who can see this review)
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
performanceSchema.index({ employee: 1, date: -1 });
performanceSchema.index({ reviewer: 1 });
performanceSchema.index({ rating: 1 });
performanceSchema.index({ 'metrics.quality': 1 });

// Virtual for average metric score
performanceSchema.virtual('averageMetricScore').get(function() {
  const metrics = this.metrics;
  const values = [metrics.quality, metrics.productivity, metrics.attendance, metrics.teamwork, metrics.communication].filter(m => m !== undefined);
  if (values.length === 0) return 0;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
});

// Static method to get performance summary for an employee
performanceSchema.statics.getEmployeePerformanceSummary = function(employeeId) {
  return this.aggregate([
    {
      $match: {
        employee: new mongoose.Types.ObjectId(employeeId)
      }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        latestReview: { $max: '$date' }
      }
    }
  ]);
};

// Static method to get department performance analytics
performanceSchema.statics.getDepartmentAnalytics = function(department, startDate, endDate) {
  return this.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'employee',
        foreignField: '_id',
        as: 'employeeInfo'
      }
    },
    {
      $unwind: '$employeeInfo'
    },
    {
      $match: {
        'employeeInfo.department': department,
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$employee',
        employee: { $first: '$employeeInfo.name' },
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
        latestRating: { $last: '$rating' }
      }
    },
    {
      $sort: { averageRating: -1 }
    }
  ]);
};

module.exports = mongoose.model('Performance', performanceSchema);
