npm run-script build
rm ~/Projects/FoodMap/server/assets/static/*.js
rm ~/Projects/FoodMap/server/assets/static/*.css
cp -f build/static/js/*.js ~/Projects/FoodMap/server/assets/static/
cp -f build/static/js/*.css ~/Projects/FoodMap/server/assets/static/
