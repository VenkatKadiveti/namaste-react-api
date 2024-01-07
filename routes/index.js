var express = require('express');
var router = express.Router();
var utils = require('../utils/axios');


router.get('/v1/restaurants', function(req, res, next) {
  utils.fetchFirstSetOfRestaurants().then(restaurants => {
    
    const data = restaurants?.data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || restaurants?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    const nextChunk = restaurants.data.data.pageOffset.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
    res.status(200).send({data, nextChunk})
  }).catch(error => {
    res.status(500).send({error: true, message: error.message})
  });
});

router.get('/v1/restaurants/:next', function(req, res, next) {
  const nextSet = req.params.next;
  utils.fetchNextSetOfRestaurants(nextSet).then(restaurants => {
    const data = restaurants.data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;
    const nextChunk = restaurants.data.data.pageOffset.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
    res.status(200).send({data, nextChunk})
  }).catch(error => {
    res.status(500).send({error: true, message: error.message})
  });
});

router.post('/v1/restaurant/menu', function(req, res, next) {
  const {pageType, lat, lng, restaurantId} = req.body;
  utils.fetchRestaurantsMenuDetails(pageType, lat, lng, restaurantId).then(restaurants => {
    console.log(restaurants.data.data.cards)
    const restaurant = restaurants.data.data.cards[0].card.card;
    const offers = restaurants.data.data.cards[1].card.card.gridElements.infoWithStyle.offers;
    restaurants.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards.splice(0,1)
    const menu = restaurants.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
    res.status(200).send({restaurant, offers, menu})
  }).catch(error => {
    res.status(500).send({error: true, message: error.message})
  });
});

module.exports = router;
