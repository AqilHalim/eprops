const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_noticeboard: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_noticeboard",
      references: {
        key: "id",
        model: "noticeboard_model"
      }
    },
    id_customer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_customer"
    },
    tanggaldikirim: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggaldikirim"
    }
  };
  const options = {
    tableName: "send_noticeboard",
    comment: "",
    indexes: [{
      name: "id_noticeboard",
      unique: false,
      type: "BTREE",
      fields: ["id_noticeboard"]
    }]
  };
  const SendNoticeboardModel = sequelize.define("send_noticeboard_model", attributes, options);
  return SendNoticeboardModel;
};