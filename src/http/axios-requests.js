import axios from "axios";

export const rootAddress = "https://photodel.ru";
export const rootSocketAddress = "photodel.ru";

const $api = axios.create({
  baseURL: "https://photodel.ru",
});

/* export const rootAddress = "http://localhost:8000";
export const rootSocketAddress = "localhost:8000";

const $api = axios.create({
  baseURL: "http://localhost:8000",
}); */

export class Requests {
  static async login(email, password) {
    return $api({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        username: email,
        password: password,
      },
      url: `/api/accounts/token/`,
    }).then((res) => res);
  }

  static async register(username, password, password2) {
    return $api({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        username: username,
        password: password,
        password2: password2,
      },
      url: `/api/accounts/register/`,
    }).then((res) => res);
  }

  static async changePassword(oldPass, newPass) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        old_pass: oldPass,
        new_pass: newPass,
      },
      url: `/api/accounts/profile/password/change/`,
    }).then((res) => res);
  }

  static async deleteProfile() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      url: `/api/accounts/profile/delete/`,
    }).then((res) => res);
  }

  static async updateProfile(name, surname, email, is_adult, status, token) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        surname: surname,
        email: email,
        is_adult: is_adult,
        status: status ? 2 : 1,
      },
      url: `/api/accounts/profile/update/`,
    }).then((res) => res);
  }

  static async sendEmailSubmitLink(token) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      url: `/api/accounts/email/send/`,
    }).then((res) => res);
  }

  static async checkEmailToken(code) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        code: code,
      },
      url: `/api/accounts/email/check/`,
    }).then((res) => res);
  }

  static async getProsCategories() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `/api/accounts/list_pro_categories/`,
    }).then((res) => res);
  }

  static async getProsSpecs() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `/api/accounts/list_specialization/`,
    }).then((res) => res);
  }

  static async getCountriesList() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `/api/additional_entities/list_country/`,
    }).then((res) => res);
  }

  static async getLanguages() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `/api/additional_entities/list_language/`,
    }).then((res) => res);
  }

  static async getOwnProfile() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `/api/accounts/profile/`,
    }).then((res) => res);
  }

  static async updateOwnProfile({
    ready_status,
    filming_geo,
    work_condition,
    cost_services,
    photo_technics,
    languages,
    about,
    type_pro,
    location,
    phone,
    site,
    email,
    instagram,
    facebook,
    vk,
    location_now,
    date_stay_start,
    date_stay_end,
    message,
    spec_model_or_photographer,
    string_location,
    string_location_now,
    avatar,
    is_change,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        ready_status: ready_status,
        filming_geo: filming_geo,
        work_condition: work_condition,
        cost_services: cost_services,
        photo_technics: photo_technics,
        languages: languages,
        about: about,
        type_pro: type_pro,
        location: location,
        phone: phone,
        site: site,
        email: email,
        instagram: instagram,
        facebook: facebook,
        vk: vk,
        message: message,
        spec_model_or_photographer: spec_model_or_photographer,
        string_location: string_location,
        avatar: avatar,
        is_change: is_change,
        location_now: location_now,
        date_stay_start: date_stay_start,
        date_stay_end: date_stay_end,
        string_location_now: string_location_now,
      },

      url: `/api/accounts/profile/update/`,
    }).then((res) => res);
  }

  static async getAlbumsList(id, sortField, sortType) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/album/list/${id}/${
        sortField ? `?filter_field=${sortField}` : ""
      }${sortType ? `&sort_type=${sortType}` : ""}`,
    }).then((res) => res);
  }

  static async geocode(string) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `https://geocode-maps.yandex.ru/1.x/?apikey=23576771-d5a1-4ff6-9a5f-a245787801b2&geocode=${string}`,
    }).then((res) => res);
  }

  static async createImage(photo) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photo: photo,
      },
      url: `api/gallery/image/create/`,
    }).then((res) => res);
  }

  static async createPhoto({
    gallery_image,
    name_image,
    description,
    place_location,
    photo_camera,
    focal_len,
    excerpt,
    flash,
    category,
    album,
    string_place_location,
    aperture,
    is_sell,
    iso,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        gallery_image: gallery_image,
        name_image: name_image,
        description: description,
        place_location: place_location,
        photo_camera: photo_camera,
        focal_len: focal_len,
        excerpt: excerpt,
        flash: flash,
        category: category,
        album: album,
        string_place_location: string_place_location,
        aperture: aperture,
        is_sell: is_sell,
        iso: iso,
      },
      url: `api/gallery/photo/create/`,
    }).then((res) => res);
  }

  static async getPhotosList(id, sortField, sortType) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/list/${id}/${
        sortField ? `?filter_field=${sortField}` : ""
      }${sortType ? `&sort_type=${sortType}` : ""}`,
    }).then((res) => res);
  }

  static async getSinglePhoto(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      url: `api/gallery/photo/${id}/`,
    }).then((res) => res);
  }

  static async getSinglePhotoUnauth(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/${id}/`,
    }).then((res) => res);
  }

  static async updatePhoto({
    name_image,
    description,
    place_location,
    photo_camera,
    focal_len,
    excerpt,
    flash,
    category,
    album,
    string_place_location,
    aperture,
    id,
    is_sell,
    iso,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        name_image: name_image,
        description: description,
        place_location: place_location,
        photo_camera: photo_camera,
        focal_len: focal_len,
        excerpt: excerpt,
        flash: flash,
        category: category,
        album: album,
        string_place_location: string_place_location,

        is_sell: is_sell,
        iso: iso,
        aperture: aperture,
      },
      url: `api/gallery/photo/update/${id}/`,
    }).then((res) => res);
  }

  static async updateHiddenPhotoStatus({ id, is_hidden }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        is_hidden: is_hidden,
      },
      url: `api/gallery/photo/update/${id}/`,
    }).then((res) => res);
  }

  static async deletePhoto(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photos_id: ids,
      },

      url: `api/gallery/photo/delete/`,
    }).then((res) => res);
  }

  static async deleteAlbums(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        albums_id: ids,
      },

      url: `api/gallery/album/delete/`,
    }).then((res) => res);
  }

  static async getAlbumPhotos(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/album/${id}/`,
    }).then((res) => res);
  }

  static async getSingleAlbum(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/album/${id}/`,
    }).then((res) => res);
  }

  static async getPhotosWithoutAlbum(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/album/list_photos_without_album/${id}/`,
    }).then((res) => res);
  }

  static async addPhotosToAlbum(array, album_id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photos_id: array,
        album_id: album_id,
      },

      url: `api/gallery/album/add_photos/`,
    }).then((res) => res);
  }

  static async createAlbum({ name_album, description_album, main_photo_id }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        name_album: name_album,
        description_album: description_album,
        main_photo_id: main_photo_id,
      },

      url: `api/gallery/album/create/`,
    }).then((res) => res);
  }

  static async createSession({
    session_name,
    session_description,
    session_location,
    string_session_location,
    session_date,
    session_category,
    photos,
    is_hidden,
    main_photo,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        session_name: session_name,
        session_description: session_description,
        session_location: session_location,
        string_session_location: string_session_location,
        session_date: session_date,
        session_category: session_category,
        main_photo: main_photo,

        photos: photos,
        is_hidden: is_hidden,
      },
      url: `api/gallery/photo_session/create/`,
    }).then((res) => res);
  }

  static async likePhoto(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        gallery: id,
      },

      url: `api/gallery/photo/like/create/`,
    }).then((res) => res);
  }

  static async unlikePhoto(id) {
    return $api({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/gallery/photo/like/delete/${id}/`,
    }).then((res) => res);
  }

  static async addFavoritePhoto(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        gallery: id,
      },

      url: `api/gallery/photo/favorite/create/`,
    }).then((res) => res);
  }

  static async deleteFavoritePhoto(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        gallery_favorites: ids,
      },

      url: `api/gallery/photo/favorite/delete/`,
    }).then((res) => res);
  }

  static async getSessions(id, sortField, sortType) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo_session/list/${id}/${
        sortField ? `?filter_field=${sortField}` : ""
      }${sortType ? `&sort_type=${sortType}` : ""}`,
    }).then((res) => res);
  }

  static async getSingleSession(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/gallery/photo_session/${id}/`,
    }).then((res) => res);
  }

  static async getSingleSessionUnauth(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo_session/${id}/`,
    }).then((res) => res);
  }

  static async likeSession(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photo_session: id,
      },

      url: `api/gallery/photo_session/like/create/`,
    }).then((res) => res);
  }

  static async unlikeSession(id) {
    return $api({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/gallery/photo_session/like/delete/${id}/`,
    }).then((res) => res);
  }

  static async addFavoriteSession(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photo_session: id,
      },

      url: `api/gallery/photo_session/favorite/create/`,
    }).then((res) => res);
  }

  static async deleteFavoriteSession(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photo_session_favorites: [Number(id)],
      },

      url: `api/gallery/photo_session/favorite/delete/`,
    }).then((res) => res);
  }

  static async createPhotoComment(photo, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        gallery: photo,
        content: content,
      },

      url: `api/gallery/photo/comment/create/`,
    }).then((res) => res);
  }

  static async editPhotoComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
        content,
      },

      url: `api/gallery/photo/comment/edit/`,
    }).then((res) => res);
  }

  static async deletePhotoComment(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
      },

      url: `api/gallery/photo/comment/delete/`,
    }).then((res) => res);
  }

  static async editPhotoSessionComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
        content,
      },

      url: `api/gallery/photo_session/comment/edit/`,
    }).then((res) => res);
  }

  static async deletePhotoSessionComment(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
      },

      url: `api/gallery/photo_session/comment/delete/`,
    }).then((res) => res);
  }

  static async editPlaceComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
        content,
      },

      url: `api/film_places/comment/edit/`,
    }).then((res) => res);
  }

  static async deletePlaceComment(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
      },

      url: `api/film_places/comment/delete/`,
    }).then((res) => res);
  }

  static async editTrainingComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
        content,
      },

      url: `api/trainings/comment/edit/`,
    }).then((res) => res);
  }

  static async deleteTrainingComment(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        comment_id: id,
      },

      url: `api/trainings/comment/delete/`,
    }).then((res) => res);
  }

  static async getPhotoComments(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/comment/list/${id}/`,
    }).then((res) => res);
  }

  static async getSessionComments(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo_session/comment/list/${id}/`,
    }).then((res) => res);
  }

  static async createSessionComment(photo, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        photo_session: photo,
        content: content,
      },

      url: `api/gallery/photo_session/comment/create/`,
    }).then((res) => res);
  }

  static async getPlacesCategories() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/category/list/`,
    }).then((res) => res);
  }

  static async createFilmPlace({
    name_place,
    place_image,
    description,
    photo_camera,
    cost,
    payment,
    place_location,
    string_place_location,
    is_hidden,
    category,
    main_photo,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        name_place: name_place,
        place_image: place_image,
        description: description,
        photo_camera: photo_camera,
        cost: cost,
        payment: payment,
        place_location: place_location,
        string_place_location: string_place_location,
        is_hidden: is_hidden,
        category: category,
        main_photo: main_photo,
      },

      url: `api/film_places/create/`,
    }).then((res) => res);
  }

  static async updateFilmPlace({
    name_place,
    place_image,
    description,
    photo_camera,
    cost,
    payment,
    place_location,
    string_place_location,
    is_hidden,
    category,
    main_photo,
    id,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        name_place: name_place,
        place_image: place_image,
        description: description,
        photo_camera: photo_camera,
        cost: cost,
        payment: payment,
        place_location: place_location,
        string_place_location: string_place_location,
        is_hidden: is_hidden,
        category: category,
        main_photo: main_photo,
      },

      url: `api/film_places/update/${id}/`,
    }).then((res) => res);
  }

  static async getPlacesList(id, sortField, sortType) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/list/${id}/${
        sortField ? `?filter_field=${sortField}` : ""
      }${sortType ? `&sort_type=${sortType}` : ""}`,
    }).then((res) => res);
  }

  static async getAllPhotos({
    userCoords,
    search_words,
    name_category,
    distance,
    sortField,
    sortType,
    count_positions,
    page,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/list/${
        userCoords && `?user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&category=${name_category}` : ""
      }${`&distance=${distance}`}${
        sortField ? `&filter_field=${sortField}` : ""
      }${
        sortType
          ? `&sort_type=${sortType === "+" ? "" : sortType === "-" ? "-" : ""}`
          : ""
      }${`&count_positions=${count_positions}`}${`&page=${page}`}`,
    }).then((res) => res);
  }

  static async getAllPlaces({
    userCoords,
    search_words,
    name_category,
    distance,
    sortField,
    sortType,
    count_positions,
    page,
    place,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/list/?${
        userCoords && `user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&category=${name_category}` : ""
      }${`&distance=${distance}`}${
        sortField ? `&filter_field=${sortField}` : ""
      }${
        sortType === "-" ? `&sort_type=${sortType}` : ""
      }${`&count_positions=${count_positions}`}${`&page=${page}`}${
        place ? `&place=${place.charAt(0).toUpperCase() + place.slice(1)}` : ""
      }`,
    }).then((res) => res);
  }

  static async getAllProfiles({
    userCoords,
    search_words,
    name_category,
    distance,
    sortField,
    sortType,
    count_positions,
    page,
    place,
    name_spec,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/profile/list/${
        userCoords && `?user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${name_category !== "Все" ? `&name_category=${name_category}` : ""}${
        name_spec !== "Все" ? `&name_spec=${name_spec}` : ""
      }${`&distance=${distance}`}${
        sortField ? `&filter_field=${sortField}` : ""
      }${
        sortType === "-" ? `&sort_type=${sortType}` : ""
      }${`&count_positions=${count_positions}`}${`&page=${page}`}${
        place ? `&place=${place.charAt(0).toUpperCase() + place.slice(1)}` : ""
      }`,
    }).then((res) => res);
  }

  static async deleteFilmPlaces(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        places_id: ids,
      },

      url: `api/film_places/delete/`,
    }).then((res) => res);
  }

  static async getSinglePlace(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/film_places/${id}/`,
    }).then((res) => res);
  }

  static async getSinglePlaceUnauth(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/${id}/`,
    }).then((res) => res);
  }

  static async getPlaceComments(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/comment/list/${id}/`,
    }).then((res) => res);
  }

  static async likePlace(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        place: id,
      },

      url: `api/film_places/like/create/`,
    }).then((res) => res);
  }

  static async unlikePlace(id) {
    return $api({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/film_places/like/delete/${id}/`,
    }).then((res) => res);
  }

  static async addPlaceToFavorites(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        place: id,
      },

      url: `api/film_places/favorite/create/`,
    }).then((res) => res);
  }

  static async deleteFavoritePlace(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        place_favorites: [Number(id)],
      },

      url: `api/film_places/favorite/delete/`,
    }).then((res) => res);
  }

  static async createPlaceComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        place: id,
        content: content,
      },

      url: `api/film_places/comment/create/`,
    }).then((res) => res);
  }

  static async deleteSessions(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        photo_sessions_id: ids,
      },

      url: `api/gallery/photo_session/delete/`,
    }).then((res) => res);
  }

  static async getPublicProfile(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("access") && {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        }),
      },

      url: `api/accounts/profile/${id}/`,
    }).then((res) => res);
  }

  static async getFavoriteProfiles(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/profile/favorite/list/${id}/`,
    }).then((res) => res);
  }

  static async getFavoritePhotos(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/favorite/list/${id}/`,
    }).then((res) => res);
  }

  static async getFavoritePlaces(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/favorite/list/${id}/`,
    }).then((res) => res);
  }

  static async getFavoriteSessions(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo_session/favorite/list/${id}/`,
    }).then((res) => res);
  }

  static async createNewChat({ sender, receiver }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        sender_id: sender,
        receiver_id: receiver,
      },

      url: `api/chat/create/`,
    }).then((res) => res);
  }

  static async addFavoriteProfile(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        receiver_favorite: id,
      },

      url: `api/accounts/profile/favorite/create/`,
    }).then((res) => res);
  }

  static async deleteFavoriteProfile(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        profile_favorites: [Number(id)],
      },

      url: `api/accounts/profile/favorite/delete/`,
    }).then((res) => res);
  }

  static async createNewRequest({
    filming_timestamp,
    hours_duration,
    filming_type,
    filming_status,
    count_person,
    filming_budget,
    description,
    place_filming,
    request_receiver_id,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        filming_timestamp: filming_timestamp,
        hours_duration: hours_duration + "часа (-ов)",
        filming_type: filming_type,
        filming_status: filming_status,
        count_person: count_person,
        filming_budget: filming_budget,
        description: description,
        place_filming: place_filming,
        receiver_profile: request_receiver_id,
      },

      url: `api/film_places/film_request/create/`,
    }).then((res) => res);
  }

  static async getPopularPhotos() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/popular/`,
    }).then((res) => res);
  }

  static async getPopularProfiles() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/profile/list/?user_coords=53.9246997%2027.59311&distance=10000000000&filter_field=likes&sort_type=-&count_positions=12&page=1`,
    }).then((res) => res);
  }

  static async getPopularPlaces() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/best/list/`,
    }).then((res) => res);
  }

  static async getCities() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/list_city/`,
    }).then((res) => res);
  }

  static async getNearestCity(coords) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/check_city/?user_coordinates=${coords}`,
    }).then((res) => res);
  }

  static async getAllPlacesMarks({
    userCoords,
    search_words,
    name_category,
    distance,
    place,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/list_map/?${
        userCoords && `user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&category=${name_category}` : ""
      }${`&distance=${distance}`}${
        place ? `&place=${place.charAt(0).toUpperCase() + place.slice(1)}` : ""
      }`,
    }).then((res) => res);
  }

  static async getAllPhotosMarks({
    userCoords,
    search_words,
    name_category,
    distance,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/gallery/photo/list_map/?${
        userCoords && `user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&category=${name_category}` : ""
      }${`&distance=${distance}`}`,
    }).then((res) => res);
  }

  static async getAllProfilesMarks({
    userCoords,
    search_words,
    name_category,
    distance,
    place,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/profile/list_map
/?${userCoords && `user_coords=${userCoords.join(" ")}`}${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&name_category=${name_category}` : ""
      }${`&distance=${distance}`}${
        place ? `&place=${place.charAt(0).toUpperCase() + place.slice(1)}` : ""
      }`,
    }).then((res) => res);
  }

  static async getPublicRequests(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/film_places/film_request/list_incoming/${id}/`,
    }).then((res) => res);
  }

  static async createNewRequestUnauth({
    filming_timestamp,
    hours_duration,
    filming_type,
    filming_status,
    count_person,
    filming_budget,
    description,
    place_filming,
    request_receiver_id,
    email,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        filming_timestamp: filming_timestamp,
        hours_duration: hours_duration + "часов",
        filming_type: filming_type,
        filming_status: filming_status,
        count_person: count_person,
        filming_budget: filming_budget,
        description: description,
        place_filming: place_filming,
        receiver_profile: request_receiver_id,
        email: email,
      },

      url: `api/film_places/create_not_auth_film_request/`,
    }).then((res) => res);
  }

  static async checkUnauthRequest({ code, email }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        code: code,
        email: email,
      },

      url: `api/film_places/confirm_email/`,
    }).then((res) => res);
  }

  static async getLastComments() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/last_comments/`,
    }).then((res) => res);
  }

  static async getAdverts() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/info_block/`,
    }).then((res) => res);
  }

  static async updateSession({
    session_name,
    session_description,
    session_location,
    string_session_location,
    session_date,
    session_category,
    photos,
    is_hidden,
    main_photo,
    id,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        session_name: session_name,
        session_description: session_description,
        session_location: session_location,
        string_session_location: string_session_location,
        session_date: session_date,
        session_category: session_category,
        main_photo: main_photo,

        photos: photos,
        is_hidden: is_hidden,
      },
      url: `api/gallery/photo_session/update/${id}/`,
    }).then((res) => res);
  }

  static async clickAdvert(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/add_click_to_advertisement/${id}/`,
    }).then((res) => res);
  }

  static async sendPassResetToken(username) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        username: username,
      },

      url: `api/accounts/reset-password-email/`,
    }).then((res) => res);
  }

  static async updatePassword(token, password, password2) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        token: token,
        new_password1: password,
        new_password2: password2,
      },

      url: `api/accounts/user/update-password/`,
    }).then((res) => res);
  }

  static async updateFilmingStatus(id, status) {
    return $api({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        request_id: Number(id),
        filming_status: status,
      },

      url: `api/chat/update_film_request_status/`,
    }).then((res) => res);
  }

  static async getPollsList() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/additional_entities/list_polls/`,
    }).then((res) => res);
  }

  static async addPollVote(choice) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        choice: choice,
      },

      url: `api/additional_entities/add_answer/`,
    }).then((res) => res);
  }

  static async updateAlbum({ id, name_album, description_album }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        name_album: name_album,
        description_album: description_album,
      },

      url: `api/gallery/album/update/${id}/`,
    }).then((res) => res);
  }

  static async getTrainingsCategories() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/category/list/`,
    }).then((res) => res);
  }

  static async createTraining({
    title,
    description,
    place,
    cost,
    firstPayment,
    main_photo,
    category,
    startDate,
    endDate,
    addressLine,
    upsendPhotosArray,
    coords,
    countPlaces,
    placeLocation,
    training_team,
    training_orgs,
  }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        training_title: title,
        training_description: description,
        place: place,
        cost: cost,
        first_payment: firstPayment,
        main_photo: main_photo,
        training_images: upsendPhotosArray,
        string_place_location: addressLine,
        place_location: coords,
        training_category: category,
        start_date: startDate + "T00:00",
        end_date: endDate + "T00:00",
        summary_members: countPlaces,
        place_location: placeLocation,
        training_team: training_team,
        training_orgs: training_orgs,
      },

      url: `api/trainings/create/`,
    }).then((res) => res);
  }

  static async getTrainingsList(id, sortField, sortType) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/list/${id}/${
        sortField ? `?filter_field=${sortField}` : ""
      }${sortType ? `&sort_type=${sortType}` : ""}`,
    }).then((res) => res);
  }

  static async deleteTraining(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        trainings_id: ids,
      },

      url: `api/trainings/delete/`,
    }).then((res) => res);
  }

  static async getAllTrainingsList({
    userCoords,
    search_words,
    name_category,
    distance,
    sortField,
    sortType,
    count_positions,
    page,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/list/${
        userCoords && `?user_coords=${userCoords.join(" ")}`
      }${
        userCoords && search_words
          ? `&search_words=${search_words}`
          : !userCoords && search_words
          ? `&search_words=${search_words}`
          : ""
      }${
        name_category !== "Все" ? `&name_category=${name_category}` : ""
      }${`&distance=${distance}`}${
        sortField ? `&filter_field=${sortField}` : ""
      }${
        sortType === "-" ? `&sort_type=${sortType}` : ""
      }${`&count_positions=${count_positions}`}${`&page=${page}`}`,
    }).then((res) => res);
  }

  static async getAllTrainingsListMap() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/list_map/`,
    }).then((res) => res);
  }

  static async getSingleTraining(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/trainings/${id}/`,
    }).then((res) => res);
  }

  static async getSingleTrainingUnauth(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/${id}/`,
    }).then((res) => res);
  }

  static async likeTraining(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        training: id,
      },

      url: `api/trainings/like/create/`,
    }).then((res) => res);
  }

  static async unlikeTraining(id) {
    return $api({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/trainings/like/delete/${id}`,
    }).then((res) => res);
  }

  static async addFavoriteTraining(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        training: id,
      },

      url: `api/trainings/favorite/create/`,
    }).then((res) => res);
  }

  static async deleteFavoriteTraining(ids) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        training_favorites: ids,
      },
      url: `api/trainings/favorite/delete/`,
    }).then((res) => res);
  }

  static async addTrainingComment(id, content) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        training: id,
        content: content,
      },

      url: `api/trainings/comment/create/`,
    }).then((res) => res);
  }

  static async getTrainingComments(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/trainings/comment/list/${id}/`,
    }).then((res) => res);
  }

  static async getProfilesForTeamSearch({
    category,
    spec,
    location,
    name,
    page,
  }) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/accounts/profile/list/?${name ? `&search_words=${name}` : ""}${
        category !== "Все" ? `&name_category=${category}` : ""
      }${spec !== "Все" ? `&name_spec=${spec}` : ""}${
        location ? `&address=${location}` : ""
      }${`&count_positions=${8}`}${`&page=${page}`}${`&filter_field=likes`}${`&sort_type=${"-"}`}`,
    }).then((res) => res);
  }

  static async inviteToTeam({ receiver_id, sender_id }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        invite_sender: sender_id,
        invite_receiver: receiver_id,
      },

      url: `api/accounts/team/send_invite/`,
    }).then((res) => res);
  }

  static async getIncomingTeamRequests(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/team/incoming_invites_list/${id}/`,
    }).then((res) => res);
  }

  static async getOutgoingTeamRequests(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/team/outgoing_invites_list/${id}/`,
    }).then((res) => res);
  }

  static async changeInviteStatus({ request_id, request_status }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        request_id: request_id,
        status: request_status,
      },

      url: `api/accounts/team/change_invite_status/`,
    }).then((res) => res);
  }

  static async getTeamList(id, userCoords) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      url: `api/accounts/team/list/${id}/${
        userCoords && `?user_coords=${userCoords.join(" ")}`
      }`,
    }).then((res) => res);
  }

  static async sendTrainingRequest(user, training) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        request_user: user,
        training: Number(training),
      },

      url: `api/trainings/requests/create/`,
    }).then((res) => res);
  }

  static async getIncomingTrainingRequests(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/trainings/requests/list_incoming/${id}/`,
    }).then((res) => res);
  }

  static async getOutgoingTrainingRequests(id) {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/trainings/requests/list_outgoing/${id}/`,
    }).then((res) => res);
  }

  static async changeTrainingRequestStatus({ request, status }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        request_id: request,
        status: status,
      },

      url: `api/trainings/requests/change_request_status/`,
    }).then((res) => res);
  }

  static async addReview({ senderUser, receiverUser, mark, content, photos }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        sender_profile: senderUser,
        receiver_profile: receiverUser,
        mark: mark,
        content: content,
        images: photos,
      },

      url: `api/gallery/review/create/`,
    }).then((res) => res);
  }

  static async updateReview({ photos, id }) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        images: photos,
      },

      url: `api/gallery/review/update/${id}/`,
    }).then((res) => res);
  }

  static async readMessagesNotifications(id) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        chat_id: id,
      },

      url: `api/accounts/profile/notifications/read_messages_notifications/`,
    }).then((res) => res);
  }

  static async readReviewsNotifications() {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/accounts/profile/notifications/read_reviews_notifications/`,
    }).then((res) => res);
  }

  static async getReviewsList(id, sortType, sortField) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        sort_type: sortType === '+' ? '' : '-',
        sort_field: sortField === 1 ? 'date' : 'mark'
      },

      url: `api/gallery/review/list/${id}/`,
    }).then((res) => res);
  }

  static async getMyReviewsList(sortType, sortField
  ) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      data: {
        sort_type: sortType === '+' ? '' : '-',
        sort_field: sortField === 1 ? 'date' : 'mark'
      },

      url: `api/gallery/review/my/`,
    }).then((res) => res);
  }

  static async getNotifications() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/accounts/profile/notifications/list/`,
    }).then((res) => res);
  }

  static async readNotifications(list) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        notifications: list,
      },

      url: `api/accounts/profile/notifications/read/`,
    }).then((res) => res);
  }

  static async createPayment(amount, plan, duration) {
    return $api({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      data: {
        amount: amount,
        plan: plan,
        duration: duration,
      },

      url: `api/accounts/payment/create/`,
    }).then((res) => res);
  }

  static async checkPayment() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/accounts/payment/check/`,
    }).then((res) => res);
  }

  static async getPayments() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/accounts/payment/get/`,
    }).then((res) => res);
  }

  static async getNotAuthRequests() {
    return $api({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      url: `api/film_places/list_not_auth_requests/`,
    }).then((res) => res);
  }
}

export default Requests;
