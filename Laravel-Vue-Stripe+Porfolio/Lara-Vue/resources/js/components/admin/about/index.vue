<script setup>
import Base from '../layouts/base.vue';
import { onMounted, ref} from 'vue';

 let form = ref({
    name: '',
    email:'',
    phone: '',
    // photo: '',
    cv: '',
    address: '',
    description: '',
    tagline:'',
 });

 onMounted(async()=>{
    getAbout()
 });

 const getAbout=async()=>{
    let response = await axios.get("/api/edit_about")
    form.value = response.data;
    console.log('form',form.value)
 }


const uploadCV= (e)=>{
    console.log(e.target.files[0]);
    form.value.cv = e.target.files[0];   
}

 const updateAbout =async ()=>{
                
    await axios.post(`/api/update_about/${form.value.id}`, form.value)
    .then(response =>{
        toast.fire({
            icon: "success",
            title: "Update is Succesful"
        })
    })
 }


 const updateAboutFile =async ()=>{
    const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }


                await axios.post(`/api/update_about_file/${form.value.id}`, form.value, config)
                .then(response =>{
                    toast.fire({
                        icon: "success",
                        title: "Update is Succesful"
                    })
                })
             }


</script>

<template>
    <Base/>    
    <main class="main">
            <!-- Side Nav Dummy-->
        <div class="main__sideNav">

        </div>
            <!-- End Side Nav -->
            <!-- Main Content -->
        <div class="main__content">
           
            <section class="about section" id="about">
                <div class="about_container">
                    <div class="titlebar">
                        <div class="titlebar_item">
                            <h1>About Us</h1>
                        </div>
                        <div class="titlebar_item">
                            <div class="btn btn-secondary" @click.prevent="updateAbout">
                                Save Changes
                            </div>
                        </div> 
                    </div>
                    <div class="card_wrapper">
                        <div class="wrapper_left">
                            <div class="card">
                                <p>Full Name</p>
                                <input type="text" v-model="form.name" class="input" />

                                <p>Email</p>
                                <input type="email" v-model="form.email" class="input" />

                                <p>Phone</p>
                                <input type="text" v-model="form.phone" class="input" />

                                <p>Address</p>
                                <input type="text" v-model="form.address" class="input" />
        
                                <p>Description</p>
                                <textarea cols="10" rows="5" v-model="form.description" ></textarea>
                                    
                            </div>
                            <div class="card">
                                <p>Tagline</p>
                                <input type="text" v-model="form.tagline" class="input" />     
                            </div>
                        </div>
            
                       
                          <form @submit="formSubmit" enctype="multipart/form-data">
                        
                     
                        <strong> Current CV:  {{ form.cv }}</strong>
                        
                        <input type="file" class="form-control"  @change="uploadCV">
                        <button @click="updateAboutFile" class="btn btn-success">Submit File</button>
                        </form>
                        
                    </div>
                    <div class="titlebar">
                        <div class="titlebar_item">
                            
                        </div>
                        <div class="titlebar_item">
                            <div class="btn btn-secondary" @click.prevent="updateAbout" >
                                Save Changes
                            </div>
                        </div> 
                    </div>
                </div>
            </section>

        </div>
    </main>
</template>