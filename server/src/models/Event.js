module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    owner: DataTypes.STRING,
    genre: DataTypes.STRING,
    date: DataTypes.DATE,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country: DataTypes.STRING,
    eventImageUrl: DataTypes.STRING,
    payLink: DataTypes.STRING,
    description: DataTypes.TEXT
  })

  Event.associate = function (models) {
  }

  return Event
}
