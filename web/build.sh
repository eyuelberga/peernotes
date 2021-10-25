if [ ${ENV} = "TEST" ]; then
    yarn build:test
else
    yarn build
fi
