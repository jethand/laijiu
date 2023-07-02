// 云函数入口文件
const cloud = require('wx-server-sdk')
const { Sequelize } = require('sequelize');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV, traceUser: true }) // 使用当前云环境


const getHomeList = async (sequelize) => {
  const [rows] = await sequelize.query('select * from home_list order by id desc limit 1');
  return rows;
};

const getAllTypeList = async (sequelize) => {
  const [rows] = await sequelize.query('select * from product_type_list');
  return rows;
};

const getTypeListById = async (sequelize, type_id) => {
  const sql = type_id === -1 ? `select * from product_info_list where selling = 1` : `select * from product_info_list where type_id = ${type_id} and selling = 1`
  const [rows] = await sequelize.query(sql);
  return rows;
};
const getProductInfo = async (sequelize, type_id, pro_id) => {
  const sql = type_id === -1 ? `select * from product_info_list` : `select * from product_info_list where type_id = ${type_id} and pro_id = ${pro_id}`
  const [rows] = await sequelize.query(sql);
  return rows;
};
const getProductDetail = async (sequelize, type_id, pro_id) => {
  const sql = `select * from product_info_detail_list where type_id = ${type_id} and pro_id = ${pro_id}`;
  const [rows] = await sequelize.query(sql);
  return rows;
};

const getCultureList = async (sequelize) => {
  const sql = `select * from culture_list`;
  const [rows] = await sequelize.query(sql);
  return rows;
};

// 云函数入口函数
exports.main = async(event) => {
  const { path } = event;
  try {
    const config = {
      host: "112.74.189.230",//本机ip
      username: "root",//数据库用户名
      password: "account.1994",//数据库密码
      prot:3306,//数据库端口
      database: "laijiu",//数据库名称
      dialect: "mysql",//数据库类型
      pool:{  //数据库连接池
        max:20,  //最大连接对象的个数
        min:5,  //最小连接对象的个数
        idle:1000  //最长等待时间，单位为毫秒
      }
    }
    const sequelize = new Sequelize(config);
    switch(path){
      case "test": {
        return []
      }
      case "/api/home/list": {
        return getHomeList(sequelize);
      }
      case "/api/product/type/list": {
        return getAllTypeList(sequelize);
      }
      case "/api/product/type/list/{type_id}": {
        const { type_id } = event;
        return getTypeListById(sequelize, type_id);
      }
      case "/api/product/info/{type_id}/{pro_id}": {
        const { type_id, pro_id } = event;
        return getProductInfo(sequelize, type_id, pro_id);
      }
      case "/api/product/detail/{type_id}/{pro_id}": {
        const { type_id, pro_id } = event;
        return getProductDetail(sequelize, type_id, pro_id);
      }
      case "/api/culture/list": {
        return getCultureList(sequelize);
      }
    }
    return null;
  } catch (err) {
    return {
      "msg": "报错了",
      err: err.stack,
      message: err.message
    }
  }
};

