import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema(
// 参数1：字段定义（你的数据长什么样） 
  {
    title: { type: String, required: true },
    date: Date,
    image: String,
    content: String,
  },
    // 参数2：配置选项（这个 Schema 怎么运作）
  {
    timestamps: {},
  }
);

const Article = mongoose.model("Article", articleSchema);

export { Article };
