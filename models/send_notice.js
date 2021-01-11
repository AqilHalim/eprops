const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    id_notice: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_notice",
      references: {
        key: "id_notice",
        model: "notice_model"
      }
    },
    id_people: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_people",
      references: {
        key: "id_people",
        model: "people_model"
      }
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    }
  };
  const options = {
    tableName: "send_notice",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_noticeboard",
      unique: false,
      type: "BTREE",
      fields: ["id_notice"]
    }, {
      name: "id_people",
      unique: false,
      type: "BTREE",
      fields: ["id_people"]
    }]
  };
  const SendNoticeModel = sequelize.define("send_notice_model", attributes, options);
  return SendNoticeModel;
};