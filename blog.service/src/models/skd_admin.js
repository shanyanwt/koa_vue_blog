/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('skd_admin', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		qq: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		sex: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		},
		create_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		update_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		last_login_time: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'skd_admin',
		timestamps: false
	});
};
