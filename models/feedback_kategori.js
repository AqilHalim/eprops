const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_kategori: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_kategori"
    },
    kategori: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "kategori"
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
    tableName: "feedback_kategori",
    comment: "",
    indexes: []
  };
  const FeedbackKategoriModel = sequelize.define("feedback_kategori_model", attributes, options);
  return FeedbackKategoriModel;
};