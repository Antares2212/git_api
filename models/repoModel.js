const { Schema, model} = require('mongoose');

const repoModel = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  html_url: { type: String },
  description: { type: String },
  forks: { type: Number },
  language: { type: String },
  stargazers_count: { type: Number },
  open_issues: { type: Number },
  owner: {
    type: Object,
    id: { type: String },
    login: { type: String },
    avatar: { type: String },
    html_url: { type: String }
  },
  created_at: { type: Date },
  updated_at: { type: Date }
}, { timestamps: true })

module.exports = model('Repo', repoModel)