export const isValidCoordinates = (coordinate) => {
  const paresd = parseFloat(coordinate);
  return !isNaN(paresd);
};

export const calculateDistance = (
  latitude1,
  longitude1,
  latitude2,
  longitude2
) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = 6371;
  const deltaLatitude = toRadians(latitude2 - latitude1);
  const deltaLongitude = toRadians(longitude2 - longitude1);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
