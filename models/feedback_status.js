const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_status"
    },
    id_feedback: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_feedback",
      references: {
        key: "id_feedback",
        model: "feedback_model"
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    id_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_user"
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
    tableName: "feedback_status",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_feedback",
      unique: false,
      type: "BTREE",
      fields: ["id_feedback"]
    }]
  };
  const FeedbackStatusModel = sequelize.define("feedback_status_model", attributes, options);
  return FeedbackStatusModel;
};