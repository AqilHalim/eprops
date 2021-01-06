const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_notice: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_notice"
    },
    subject: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subject"
    },
    isi: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isi"
    },
    gambar: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gambar"
    },
    penerima: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "penerima"
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
    tableName: "notice",
    comment: "",
    indexes: []
  };
  const NoticeModel = sequelize.define("notice_model", attributes, options);
  return NoticeModel;
};