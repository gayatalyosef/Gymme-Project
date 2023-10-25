
class studio {
    constructor(
        name,
        url,
        addressString,
        latCoordinate,
        lngCoordinate,
        contactInfo,
        filters,
        reviews,
        photoIndex
      ) {
        this.name = name;
        this.url = url;
        this.addressString = addressString;
        this.latCoordinate = latCoordinate;
        this.lngCoordinate = lngCoordinate;
        this.contactInfo = contactInfo;
        this.filters = filters;
        this.reviews = reviews;
        this.photoIndex = photoIndex;
        this.rating =Number.isInteger(filters.rating) ? filters.rating : parseFloat(filters.rating).toFixed(2);
        this.priceString = filters.price ? filters.price[0] + " - " +filters.price[1]:"";
      }
  }
  
  export { studio };