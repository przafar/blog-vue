<template>
    <div class="container signup"> 
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="email"
                       class="form-control" 
                       id="exampleInputEmail1" 
                       aria-describedby="emailHelp"
                >
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email"
                       class="form-control"
                       :class="{'is-invalid': $v.email.$error}" 
                       id="email" 
                       aria-describedby="emailHelp"
                       v-model="email"
                       @blur="$v.email.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.email.required">
                    Email field is required
                </div>
                <div class="invalid-feedback" v-if="!$v.email.email">
                    This field should be an email
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                       class="form-control" 
                       id="password"
                       :class="{'is-invalid': $v.password.$error}" 
                       v-model="password"
                       @blur="$v.password.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.password.minLength">
                    Min length of password is {{ $v.password.$params.minLength.min }}. Now it is {{ password.length }}
                </div>
            </div>

            <div class="form-group">
                <label for="password">Confirm password</label>
                <input type="password"
                       class="form-control" 
                       id="confirm"
                       :class="{'is-invalid': $v.confirmPassword.$error}" 
                       v-model="confirmPassword"
                       @blur="$v.confirmPassword.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">
                    Passwords should match
                </div>
            </div>

            <!-- <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password">
            </div> -->

            <!-- <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button> -->
        </form>
        
        <footer>Made width <b class="vue">Vue</b> by <b>przafar</b></footer>
    </div>
</template>
<script>
    import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
    export default {
        data() {
            return{
                email: '',
                password: '',
                confirmPassword: '',
                person: '',
            }
        },
        validations: {
            email: {
                required,
                email,
                uniqEmail: function(newEmail) {
                    if (newEmail === '') return true
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const value = newEmail !== resemail
                            const email = this.person.email
                            this.$http.get('http://localhost:3000/person').then(function(response) {
                                this.person = response.email
                            })
                            resolve(value)
                        }, 1000)
                    })
                }
            },
            password: {
                minLength: minLength(6)
            },
            confirmPassword: {
                sameAs: sameAs((vue) => {
                    return vue.password
                })
            }
        }
    }
</script>
<style scoped>
    footer {
        margin-bottom: 20px;
    }
    .vue {
        color: #4fc08d;
    }
    .signup {
        margin-top: 100px;
    }
</style>