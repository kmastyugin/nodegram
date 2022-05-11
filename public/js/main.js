'use strict';

// Кнопка добавить
const addPostButton = document.getElementById('add')
// Кнопка изменить профиль
const changeProfileButton = document.getElementById('change_profile')
// Модальное окно добавления публикации
const modalAdd = document.getElementById('modal_add')
// Блок картинки в модальном окне
const modalAddImage = document.getElementById("add_image")
// Первая страница модального окна
const firstPageModalAdd = document.getElementById("add_photo_block")
// Вторая страница модального окна
const secondPageModalAdd = document.getElementById("add_description")
// Поле ввода комментария
const modalAddComment = document.getElementById("add_comment")
// Загруженная картинка
let file = null
// Блок с картинками профиля
const profileList = document.getElementById("profile_list")
// Модальное окно с полным постом
const modalFullPost = document.getElementById("modal_post")
// Кнопка редактировать профиль
const profileEditButton = document.getElementById("change_profile")
// Модальное окно с редактированием профиля
const modalEditProfile = document.getElementById("modal_profile")
// Блок с полной картинкой публикации
const modalFullPhoto = document.getElementById("full_photo")
// Выплывающее окно с кнопками
const windowButtons = document.getElementById("buttons_menu")
// Кнопка с аватаром профиля в шапке
const profileButton = document.getElementById("profile_button")
// Форма с отправкой публикации
const formUpload = document.getElementById("file_upload")
// Поле с комментарием в форме с изображением
const commentData = document.getElementById("comment_data")
// Форма с отправкой аватара
const avatarUploadForm = document.getElementById("avatar_upload")
// Кнопка для обновления аватара
const avatarUploadBtn = document.getElementById("avatar_upload_btn")
// Поле с загружаемой аватаркой
const avatarImage = document.getElementById("avatarImage")
// Поля редактирования профиля
const profileEditUsername = document.getElementById("username_edit")
const profileEditNickname = document.getElementById("nickname_edit")
const profileEditGender = document.getElementById("gender_edit")
// Кнопка отправки изменений профиля
const profileEditBtn = document.getElementById("edit_profile_btn")
// Блок со всеми комментариями в полной записи
const fullComments = document.getElementById("full__comments")
// Автор полной публикации
const fullPostName = document.getElementById("full_post_name")
// Поле ввода комментария в полной публикации
const addCommentFull = document.getElementById("add_comment_full")
// Кнопка для добавления нового комментария
const submitNewFullComment = document.getElementById("submit_new_comment_full")

// Клик на кнопку добавить
addPostButton.addEventListener('click', () => {
    // Отображение модального окна
    modalAdd.classList.remove("hide")
})

// Клик по модальному окну с добавлением публикации
modalAdd.addEventListener("click", e => {
    // Если клик по фону - скрыть модальное окно
    if (e.target.id === "modal_add") {
        return modalAdd.classList.add("hide")
    }

    // Если клик по первой кнопке
    if (e.target.id === "add_submit1") {
        e.preventDefault()

        let reader = new FileReader
        reader.readAsDataURL(document.getElementById("add_photo").files[0])

        reader.addEventListener('load', () => {
            file = reader.result
            modalAddImage.src = file
            firstPageModalAdd.classList.add("hide")
            secondPageModalAdd.classList.remove("hide")
        })
    }
    // Если клик по второй кнопке
    else if (e.target.id === "add_submit2") {
        e.preventDefault()

        commentData.value = modalAddComment.value
        formUpload.submit()
    }
})

// Скрыть модалку с публикацей, если клик по фону
if (modalFullPost) {
    modalFullPost.addEventListener('click', e => {
        if (e.target.id === "modal_post") {
            modalFullPost.classList.add('hide')
        }
    })
}

// Если страница профиля
if (modalEditProfile) {
    const likeBtn = modalFullPost.querySelector('.like svg')
    likeBtn.addEventListener('click', (e) => {
        // e.target.classList.toggle('active')
        const id = +e.target.parentElement.dataset.id

        fetch(`/api/like/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                const likesBlock = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.likes')
                getLikeCountForPost(id, likesBlock)
                e.target.classList.toggle('active')
            })
    })

    if (modalEditProfile) {
        // Скрыть модалку редактирования профиля при нажатии на фон
        modalEditProfile.addEventListener('click', e => {
            if (e.target.id === "modal_profile") {
                modalEditProfile.classList.add('hide')
            }
        })
    }

    if (profileEditButton) {
        // Отобразить модалку редактирования профиля при нажатии на кнопку
        profileEditButton.addEventListener("click", async (e) => {
            modalEditProfile.classList.remove('hide')

            let data = null;

            await fetch('/api/info')
                .then(response => response.json())
                .then(response => {
                    data = response
                })

            profileEditUsername.value = data.name
            profileEditNickname.value = data.nickname
            profileEditGender.value = data.gender || ""

        })
    }


    // Список всех лайков и установка подсвечивания, если лайк стоит
    const getLikesPost = async (id, svg) => {
        await fetch('/api/likes')
            .then(res => res.json())
            .then(res => {
                if (res.includes(id)) {
                    svg.classList.add('active')
                } else {
                    svg.classList.remove('active')
                }
            })
    }

    // Отобразить модалку публикации при нажатии на нее
    profileList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("info")) {
            modalFullPhoto.src = e.target.nextElementSibling.src
            modalFullPost.classList.remove('hide')
            fullComments.innerHTML = "<div class='comm author'></div>"

            // Установка кол-во лайков на публикации
            modalFullPost.querySelector('.likes span').textContent = e.target.dataset.likes
            likeBtn.parentElement.dataset.id = e.target.dataset.id // Установка ID на кнопку Like

            // Получение лайков и установка/удаления активности кнопки
            getLikesPost(+e.target.dataset.id, likeBtn)

            // Информация
            fullPostName.textContent = e.target.dataset.nickname
            fullPostName.parentElement.href = `/${fullPostName.textContent}`
            fullPostName.previousElementSibling.src = e.target.dataset.avatar

            const desc = document.querySelector('.comm.author')
            desc.innerHTML = `<span>${e.target.dataset.nickname}
                </span> ${e.target.dataset.comment ? e.target.dataset.comment : 'Описание отсутствует'}`

            addCommentFull.dataset.id = e.target.dataset.id

            let commentsList = []
            await fetch(`/comments/${e.target.dataset.id}`)
                .then(res => res.json())
                .then(res => {
                    commentsList = res
                })

            if (!commentsList.length) {
                commentsList.push('Нет комментариев')
            }

            commentsList.forEach(comment => {
                fullComments.insertAdjacentHTML('beforeend', `
                    <div class="comm">
                        <span>${comment.nickname || ""}</span> ${comment.comment || comment}
                    </div>
                `)
            })
        }
    })

    // Клик по кнопке добаивть комментарий
    submitNewFullComment.addEventListener('click', async (e) => {
        e.preventDefault()

        fetch(`/comments/${addCommentFull.dataset.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: addCommentFull.dataset.id,
                comment: addCommentFull.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                addCommentFull.value = ""
                fullComments.insertAdjacentHTML('afterbegin', `
                <div class="comm">
                    <span>${res.nickname || ""}</span> ${res.comment}
                </div>
            `)
            })
    })

    // Клик по кнопке с обновлением аватарки
    avatarUploadBtn.addEventListener("click", e => {
        e.preventDefault()
        if (avatarImage.value === "") return false;

        avatarUploadForm.submit()
    })
}

// При нажатии на ESC скрывать все модалки
window.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
        modalEditProfile.classList.add('hide')
        modalFullPost.classList.add('hide')
        modalAdd.classList.add('hide')
    }
})

// Клик по любой части окна и скрытие меню с кнопками
window.addEventListener('click', e => {
    if (!e.target.classList.contains("profile_click")) {
        windowButtons.classList.add('hide')
    }
})

// Нажатие на кнопку с аватаром в шапке
profileButton.addEventListener('click', () => {
    windowButtons.classList.toggle('hide')
})

// Получить все комментарии нужной записи
const getComments = async (id, comments) => {
    let commentsList = []

    await fetch(`/comments/${id}`)
        .then(res => res.json())
        .then(res => {
            commentsList = res
        })


    if (!commentsList.length) {
        comments
            .parentElement
            .querySelector('.comments')
            .innerHTML += `<div class="comm empty">
                                        Комментариев нет
                                    </div>`
    }

    commentsList.forEach(comment => {
        comments.insertAdjacentHTML('beforeend', `
                    <div class="comm">
                        <span>${comment.nickname || ""}</span> ${comment.comment || comment}
                    </div>
                `)
    })
}

// Получение количество лайков по ID записи
const getLikeCount = async (id) => {
    await fetch(`/api/likes/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            document
                .querySelector(`.likes[data-id="${id}"]`)
                .querySelector('span').textContent = res
        })
        .catch(err => console.log(err))
}

// Установка лайков для всех публикаций на главной
const allPosts = document.querySelectorAll('.post_fetch')
allPosts.forEach(post => {
    const id = post.dataset.id
    const btn = post.nextElementSibling
    const comments = btn.parentElement.previousElementSibling.querySelector('.comments')

    getComments(id, comments)
    getLikeCount(id)
})

// Получение количество лайков по ID записи
const getLikeCountForPost = async (id, block) => {
    await fetch(`/api/likes/${id}`)
        .then(res => res.json())
        .then(res => {
            block.querySelector('span').innerHTML = res
            block.dataset.likes = res
        })
        .catch(err => console.log(err))
}

// Установка лайков для всех публикаций в профиле
const myPosts = document.querySelectorAll('.post.user')
if (myPosts) {
    myPosts.forEach(post => {
        const id = post.dataset.id
        const infoBlock = post.children[0]
        getLikeCountForPost(id, infoBlock)
    })
}

// Клик по контейнеру с постами
const containerPosts = document.querySelector('.col-2.mr20')
if (containerPosts) {
    containerPosts.addEventListener('click', async (e) => {
        // Клик по кнопке LIKE
        // if(e.target.classList.contains('like')) return false
        if (e.target.classList.contains('like') || e.target.classList.contains('_8-yf5') || e.target.classList.contains('group')) {
            const id = e.target.dataset.id
            fetch(`/api/like/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res => {
                    getLikeCount(id)
                    console.log(res)
                    document.querySelector(`.like[data-id="${id}"]`).children[0].classList.toggle('active')
                })

            return
        }
        else if (!e.target.classList.contains('btn')) return false;



        const postTextarea = e.target.previousElementSibling
        if (!postTextarea.value) return false;

        await fetch(`/comments/${postTextarea.dataset.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: postTextarea.dataset.id,
                comment: postTextarea.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                const comments = postTextarea.parentElement.previousElementSibling.querySelector('.comments')
                const empty = comments.querySelector('.empty')
                if (empty) {
                    empty.remove()
                }
                comments.insertAdjacentHTML('afterbegin', `
                        <div class="comm">
                            <span>${res.nickname || ""}</span> ${res.comment}
                        </div>
                    `)

                postTextarea.value = ""
            })
    })
}


// Подсветка кнопок у лайкнутых записей на главной
let likesID = []
const generateLikeBtns = () => {
    likesID.forEach(id => {
        const elem = document.querySelector(`svg[data-id="${id}"]`)
        if (elem) {
            elem.classList.add('active')
        }
    })
}

// Получение всех айди постов, где стоит лайк
const getLikes = async () => {
    await fetch('/api/likes')
        .then(res => res.json())
        .then(res => likesID = res)

    generateLikeBtns()
}
getLikes()