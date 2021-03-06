var app = new Vue({
    el: '#app',
    data: {
      access_token: "your access token here",
      url: "https://api.instagram.com/v1/users/self/media/recent/",
      username: "",
      grams: [],
      next_url: "",
      error: false
    },
    computed: {
      instapage() {
        return 'https://www.instagram.com/' + this.username
      }
    },s
    methods: {
      getGrams() {
        axios.get(this.url + "?access_token=" + this.access_token)
          .then(({data}) => {
            this.grams = data.data
            this.username = data.data[0].user.username
            this.next_url = data.pagination.next_url
          })
          .catch(function (error) {
            console.log(error)
            this.error = true
          });
      },
      getMoreGrams(){
        axios.get(this.next_url)
          .then(({data}) => {
            this.grams = this.grams.concat(data.data)
            this.next_url = data.pagination.next_url
          })
          .catch(function (error) {
            console.log(error)
            this.error = true
          });         
      }
    },
    created() {
      this.getGrams();
    }
  })