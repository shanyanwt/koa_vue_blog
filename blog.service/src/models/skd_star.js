/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('skd_star', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement:true
		},
		article_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		admin_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		},
		create_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		update_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'skd_star',
		timestamps: false
	});
};
