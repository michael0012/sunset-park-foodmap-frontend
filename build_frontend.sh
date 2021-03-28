npm run-script build
rm ~/Projects/FoodMap/server/assets/static/*.js
rm ~/Projects/FoodMap/server/assets/static/*.txt
rm ~/Projects/FoodMap/server/assets/static/*.css
rm ~/Projects/FoodMap/server/assets/static/*.map
cp -f build/static/js/* ~/Projects/FoodMap/server/assets/static/
cp -f build/static/css/* ~/Projects/FoodMap/server/assets/static/
