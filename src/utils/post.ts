import type { MarkdownInstance } from 'astro'

export const post = {
  /**
   * 日付に基づいて新しい順にソートする関数
   * @param {MarkdownInstance<Theme.Frontmatter>} a - 比較対象1
   * @param {MarkdownInstance<Theme.Frontmatter>} b - 比較対象2
   * @returns {number} - 比較結果
   */
  sortByDate: (a: MarkdownInstance<Theme.Frontmatter>, b: MarkdownInstance<Theme.Frontmatter>): number => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  },

  /**
   * 指定した数の同一カテゴリーの記事を取得する関数
   * @param {number} count - 取得する同一カテゴリーの記事の数
   * @param {MarkdownInstance<Theme.Frontmatter>} currentPage - 現在のページ
   * @param {MarkdownInstance<Theme.Frontmatter>[]} allPages - すべてのページ
   * @returns {MarkdownInstance<Theme.Frontmatter>[]} - 同一カテゴリーの記事の配列
   */
  getSameCategory: (count: number, currentPage: MarkdownInstance<Theme.Frontmatter>, allPages: MarkdownInstance<Theme.Frontmatter>[]) => {
    const posts = allPages
      .filter(page =>
        page.frontmatter.category === currentPage.frontmatter.category &&
        page.frontmatter.slug !== currentPage.frontmatter.slug // 自分自身を除外
      )
      .sort(compareDateDistance(new Date(currentPage.frontmatter.date))) // 日数の近さでソート
      .slice(0, count); // 指定した数だけ取得

    return posts;
  }
}

/**
 * 指定された日付に対する日数の近さを比較する関数
 * @param {Date} pageDate - 基準となる日付
 * @returns {function} - 2つの日付の近さを比較する関数
 * @param {MarkdownInstance<Theme.Frontmatter>} a - 比較対象1
 * @param {MarkdownInstance<Theme.Frontmatter>} b - 比較対象2
 * @returns {number} - 比較結果
 */
const compareDateDistance = (pageDate: Date) => (a: MarkdownInstance<Theme.Frontmatter>, b: MarkdownInstance<Theme.Frontmatter>): number => {
  const diffA = Math.abs(new Date(a.frontmatter.date).getTime() - pageDate.getTime());
  const diffB = Math.abs(new Date(b.frontmatter.date).getTime() - pageDate.getTime());

  // 日数が同じなら新しい方を優先
  if (diffA === diffB) {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  }
  return diffA - diffB; // 日数の近さでソート
}