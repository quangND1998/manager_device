export default {
    methods: {
        multipleSelect(data) {
            let object = Object.assign({}, data);
            console.log(typeof object);
            // // // let first = Object.assign({}, object[0]);
            let array = [];
            $.each(object, function(key, value) {
                array.push(parseInt(value.id));
            });
            return array;
        }
    },


}