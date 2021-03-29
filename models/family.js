const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_people: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id_people",
      references: {
        key: "id_people",
        model: "people_model"
      }
    },
    kk: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "kk"
    },
    hubunganKeluarga: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hubunganKeluarga",
      references: {
        key: "role",
        model: "family_role_model"
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
    tableName: "family",
    comment: "",
    indexes: [{
      name: "role",
      unique: false,
      type: "BTREE",
      fields: ["hubunganKeluarga"]
    }]
  };
  const FamilyModel = sequelize.define("family_model", attributes, options);
  return FamilyModel;
};