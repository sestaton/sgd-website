#!bin/bash

set -euo pipefail

## We need to make a few changes in order to get an Express/Node site to work under Apache
## This only needs to be done once, when development is over and you are ready for production.
function usage() {
cat << EOF
USAGE: $0 <data_dir>

data_dir  :  The directory path to the data files for the download section of the site
             (e.g., /data/raid5part1/website_data)

EOF
}

function print_error() {
cat << ERR

ERROR: Command line not parsed correctly. Check input.

ERR
}

if [ $# -lt 1 ]; then
    print_error
    usage
    exit 1
fi

data_dir=$1

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
sed -i "s@href=\"\/css@href=\"assets/css@g" views/contact.pug
sed -i "s@src=\"\/js@src=\"assets/js@g" views/contact.pug

# Step 2: Compile HTML
echo -e "=====> Compiling templates into HTML..."
gulp --env prod --outDir dist html css scripts images fonts

# Step 3: Prepare the pages so we don't have the edit every single file PATH
echo -e "=====> Preparing static distribution..."
perl compile-static.pl -i dist/html -o $static_dir -d $data_dir

# Finally, copy favicon from public to static dir
cp public/favicon.ico $static_dir

echo "=====> Done."
