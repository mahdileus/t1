import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ArticleCategoryModel from "@/models/ArticleCategory";
import ArticlesArchivePage from "../components/trmplate/article/ArticlesArchivePage";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";

export const metadata = {
  title: "آرشیو مقالات",
  description: "همه مقالات، آموزش‌ها و مطالب وبلاگ را اینجا بخوانید.",
};

const ARTICLES_PER_PAGE = 9;

export default async function ArticlesPage({ searchParams }) {
  await connectToDB();

  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);
  const search = params?.search?.trim() || "";
  const category = params?.category?.trim() || "";
  const tag = params?.tag?.trim() || "";
  const sort = params?.sort?.trim() || "newest";


  const filter = {
    status: "published",
  };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  if (tag) {
    filter.tags = { $in: [tag] };
  }

  let categoryDoc = null;

  if (category) {
    categoryDoc = await ArticleCategoryModel.findOne({
      slug: category,
      isActive: true,
    }).select("_id title slug");

    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      filter.category = null;
    }
  }

  let sortOption = { publishedAt: -1, createdAt: -1 };

  if (sort === "oldest") {
    sortOption = { publishedAt: 1, createdAt: 1 };
  } else if (sort === "reading-asc") {
    sortOption = { readingTime: 1, publishedAt: -1 };
  } else if (sort === "reading-desc") {
    sortOption = { readingTime: -1, publishedAt: -1 };
  }

  const total = await ArticleModel.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
  const skip = (page - 1) * ARTICLES_PER_PAGE;

  const [articles, categories] = await Promise.all([
    ArticleModel.find(filter)
      .select(
        "title slug excerpt cover authorName readingTime publishedAt createdAt tags category"
      )
      .populate({
        path: "category",
        select: "title slug",
      })
      .sort(sortOption)
      .skip(skip)
      .limit(ARTICLES_PER_PAGE)
      .lean(),

    ArticleCategoryModel.find({ isActive: true })
      .select("title slug parent")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return (
    <>
      <Shape />
      <Navbar
      />
      <ArticlesArchivePage
        articles={JSON.parse(JSON.stringify(articles))}
        categories={JSON.parse(JSON.stringify(categories))}
        total={total}
        page={page}
        pages={pages}
        activeFilters={{
          search,
          category,
          tag,
          sort,
        }}
      />
    </>
  );
}
