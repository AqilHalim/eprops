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
        key: "id_noticeboard",
        model: "noticeboard_model"
      }
    },
    id_people: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_people"
    },
    tanggaldikirim: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggaldikirim"
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt"
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