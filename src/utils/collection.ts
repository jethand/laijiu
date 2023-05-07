
// @ts-ignore
const db = wx.cloud.database();

// 获取下一个自增id
export const getNextProId = async () => {
  const {data} = await db.collection('product_info_detail_list').orderBy('pro_id', 'desc').limit(1).field({pro_id: true}).get()
  const [{pro_id}] = data;
  return pro_id + 1;
};