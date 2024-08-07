function getStore(store_id) {
    var store_name = ''
    switch (store_id) {
        case 16:
            store_name = 'ул. Русская, 46';
            break;
        case 15:
            store_name = 'ул. Адмирала Фокина, 23в';
            break;
        case 1:
            store_name = 'ул. Набережная, 7Б';
            break;
        case 20:
            store_name = 'ул. Кирова, 2';
            break;
        case 2:
            store_name = 'ул. Советская, 31, 3';
            break;
        case 11:
            store_name = 'ул. Сахалинская, 45А, 1';
            break;
        case 24:
            store_name = 'ул. Пуркаева М.А., 102В';
            break;
        case 28:
            store_name = 'ул. Ленина, 219';
            break;
        case 29:
            store_name = 'ул. Советская, 112А';
            break;
        default:
            break;
    }
    return store_name;

}

export default getStore;