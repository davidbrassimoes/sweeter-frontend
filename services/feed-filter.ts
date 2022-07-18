export function sortPostsByDate(p) {

    p.sort((a, b) => {
        const fa = a.createdAt.toLowerCase()
        const fb = b.createdAt.toLowerCase();

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    });
}

export function getUserFeed(feed, user) {

    const userFeed = new Array
    feed.map(p => {
        user.followsUser.map(ufu => {
            if (p.user.id == ufu.id) {
                userFeed.push(p)
            }
        })
    })
    feed.map(p => {
        if (p.tagged) {
            p.tagged.map(pt => {
                user.followsTag.map(uft => {
                    if (pt.id == uft.id) {
                        userFeed.push(p)
                    }
                })
            })
        }
    })
    feed.map(p => {
        if (p.sweeted) {
            p.sweeted.map(ps => {
                user.followsUser.map(ufu => {
                    if (ps.id == ufu.id) {
                        userFeed.push(p)
                    }
                })
            })
        }
    })

    const uniquePosts = [...new Set(userFeed)]
    return uniquePosts
}