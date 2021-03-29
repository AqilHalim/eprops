const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    hubunganKeluarga: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "hubunganKeluarga"
    },
    jenisrole: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "jenisrole"
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
    tableName: "family_role",
    comment: "",
    indexes: []
  };
  const FamilyRoleModel = sequelize.define("family_role_model", attributes, options);
  return FamilyRoleModel;
};