

async function aaa() {

    console.log('@kenkooooさんありがとう');
    const res = await fetch("https://kenkoooo.com/atcoder/resources/lang.json", { cache: 'force-cache' });
    const list = await res.json();
    $('.username').each((i, u) => {
        if (!u.href.includes('/users/')) {
            return;
        }
        const user_id = u.text;

        const lang = fcfc(list, user_id);
        u.insertAdjacentHTML('beforeend', '/' + lang);
    });
}


function fcfc(list, user_id) {
    const trim_user_id = user_id.trim();
    const index = binary_search(list, trim_user_id);
    const lang = sequence_search(trim_user_id, list, index);
    return lang;

}

function binary_search(list, key) {

    let left = -1;
    let right = list.length;


    while (right - left > 1) {
        let mid = Math.floor(left + (right - left) / 2);

        if (isOK(mid, key, list)) {
            right = mid;
        } else {
            left = mid;
        }
    }


    return right;
}
function isOK(index, key, list) {
    if (list[index]['user_id'] >= key) {
        return true;
    }
    return false;


}
function sequence_search(user_id, list, index) {

    let array = new Array();
    array = array.concat(search_one(user_id, list, index, 1));
    array = array.concat(search_one(user_id, list, index, -1));

    let max = 0;
    let lang = "";
    array.forEach(element => {
        if (max > element['count']) {
            return;
        }
        max = element['count'];
        lang = element['language'];
    });
    return lang;
}
function search_one(user_id, list, index, add) {
    const array = new Array();
    while (1) {
        console.log(index);
        if (list[index]['user_id'] !== user_id) {
            break;
        }
        array.push(list[index]);
        index += add;
    }

    return array;
}

aaa();