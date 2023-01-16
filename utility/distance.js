function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}

export function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // The radius of the planet earth in meters
        var R = 6371.0710; // Radius of the Earth in miles
        var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
        var rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (lng2-lng1) * (Math.PI/180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d * 1000;
}
