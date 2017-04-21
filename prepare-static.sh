#!bin/bash

set -euo pipefail

## We need to make a few changes in order to get an Express/Node site to work under Apache
## This only needs to be done once, when development is over and you are ready for production.

# Test for the results directory and warn if it exists
static_dir='sgd-static'

if [ -d $static_dir ]; then
    echo "=====> WARNING: Results directory '$static_dir' exists. Remove or rename it before proceeding. Exiting."
    exit 1
    #rm -rf $static_dir
fi

# Step 1: Make absolute PATHs to assets for Apache
echo -e "=====> Editing asset PATHs in templates..."
find ./views/ -type f -name "*.pug" -exec sed -i "s@src='\/images@src='assets/images@g" {} \;
find ./views/ -type f -name "*.pug" -exec sed -i "s@src=\"\/images@src=\"assets/images@g" {} \;
find ./views/ -type f -name "*-data.pug" -exec sed -i "s@href='\/data@href='assets/data@g" {} \;
find ./views/ -type f -name "*-data.pug" -exec sed -i "s@href=\"\/data@href=\"assets/data@g" {} \;
sed -i "s@href=\"\/css@href=\"assets/css@g" views/header.pug
sed -i "s@src=\"\/js@src=\"assets/js@g" views/footer.pug
sed -i "s@src=\"\/js@src=\"assets/js@g" views/stress/footer.pug

# Step 2: Compile HTML
echo -e "=====> Compiling templates into HTML..."
gulp --env prod --outDir dist html css scripts images fonts

# Step 3: Prepare the pages so we don't have the edit every single file PATH
echo -e "=====> Preparing static distribution..."
perl compile-static.pl -i dist/html -o $static_dir

echo "=====> Done."
