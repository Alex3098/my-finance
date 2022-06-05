'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryIcon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      // this.belongsTo(Category, { foreignKey: 'iconId', as: 'categoryImages' })
    }
  }
  CategoryIcon.init({
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: "category_icons",
    modelName: 'CategoryIcon',
  });
  return CategoryIcon;
};