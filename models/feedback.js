const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_feedback: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_feedback"
    },
    id_message: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_message",
      references: {
        key: "id_message",
        model: "message_model"
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
    tanggalkirim: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalkirim"
    },
    tanggalproses: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalproses"
    },
    tanggalselesai: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalselesai"
    },
    tanggalbaca: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalbaca"
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
    tableName: "feedback",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_notice",
      unique: false,
      type: "BTREE",
      fields: ["id_message"]
    }, {
      name: "id_people",
      unique: false,
      type: "BTREE",
      fields: ["id_people"]
    }]
  };
  const FeedbackModel = sequelize.define("feedback_model", attributes, options);
  return FeedbackModel;
};