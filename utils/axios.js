var axios = require('axios');

const payloadForNextSetofRestaurants = (next) => {
    return  {
        "lat": 12.9351929,
        "lng": 77.62448069999999,
        "nextOffset": "COVCELQ4KICg44nlw/22UzCnEzgC",
        "widgetOffset": {
            "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": `${next}`,
            "restaurantCountWidget": ""
        },
        "seoParams": {
            "seoUrl": "https://www.swiggy.com/",
            "pageType": "FOOD_HOMEPAGE",
            "apiName": "FoodHomePage"
        },
        "page_type": "DESKTOP_WEB_LISTING"
    }
}

const fetchFirstSetOfRestaurants = () => {
    return axios({
        method: 'get',
        url: '/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING',
        baseURL: 'https://www.swiggy.com',
        headers: {
            'Content-Type': 'application/json',
            'responseType': 'json',
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
}

const fetchNextSetOfRestaurants = (next) => {
    return axios({
        method: 'post',
        url: '/dapi/restaurants/list/update',
        baseURL: 'https://www.swiggy.com',
        headers: {
            'Content-Type': 'application/json',
            'responseType': 'json',
            'origin': 'https://www.swiggy.com',
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        data: payloadForNextSetofRestaurants(next)
    });
}

const fetchRestaurantsMenuDetails = (pageType, lat, lng, restaurantId) => {
    const url = `/dapi/menu/pl?page-type=${pageType}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
    console.log(url)
    return axios({
        method: 'get',
        url: url,
        baseURL: 'https://www.swiggy.com',
        headers: {
            'Content-Type': 'application/json',
            'responseType': 'json',
            'origin': 'https://www.swiggy.com',
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
}

const fetchUserProfile = () => {
    return axios({
        method: 'get',
        url: 'users/VenkatKadiveti',
        baseURL: 'https://api.github.com/',
        headers: {
            'Content-Type': 'application/json',
            'responseType': 'json'
        }
    });
}

module.exports = {
    fetchFirstSetOfRestaurants,
    fetchNextSetOfRestaurants,
    fetchRestaurantsMenuDetails,
    fetchUserProfile
};