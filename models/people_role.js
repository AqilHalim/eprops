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
    jenisrole: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "jenisrole"
    }
  };
  const options = {
    tableName: "people_role",
    comment: "",
    indexes: []
  };
  const PeopleRoleModel = sequelize.define("people_role_model", attributes, options);
  return PeopleRoleModel;
};