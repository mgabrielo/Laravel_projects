
<script setup>
import { onMounted, ref } from 'vue';
import Base from '../layouts/base.vue'

const showModal = ref(false)
const hideModal = ref(true)
const editMode = ref(false)

let experiences = ref([])

onMounted(async() =>{
    getExperiences()
})
 
const openModal =()=>{
    showModal.value =!showModal.value
}

const closeModal=()=>{
    showModal.value = !hideModal.value
    form.value =({})
    editMode.value = false
}

let form =ref({
    company:'',
    period:'',
    position:'',
})

const editExperience = (item)=> {
    editMode.value =true
    showModal.value = !showModal.value
    form.value = item
}

const getExperiences = async()=>{
    let response = await axios.get('/api/get_all_experience')
    experiences.value = response.data.experiences
}

const createExperience=async()=>{
    await axios.post('/api/create_experience', form.value)
    .then(response=> {
        getExperiences();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Experience Added Successfully'
        })
    })
}

const updateExperience=async()=>{
    await axios.post('/api/update_experience/'+form.value.id, form.value)
    .then(response=>{
        getExperiences();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Experience Updated Successfully'
        })
    })
}


const deleteExperience=(id)=>{
    Swal.fire({
        title :'Are you Sure You Want to Delete',
        text : 'This deletion is Permanent',
        icon : 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete This'
    }).then((result)=>{
        if (result.value) {
            axios.get('/api/delete_experience/'+id)
            .then(()=>{
                Swal.fire(
                    'Delete',
                    'Experience Delete is Successful',
                    'success'
                )
                getExperiences();
            })
        }
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
            <section class="experiences section" id="experiences">
                <div class="skills_container">
                    <div class="titlebar">
                        <div class="titlebar_item">
                            <h1>Experiences </h1>
                        </div>
                        <div class="titlebar_item">
                            <div class="btn btn__open--modal" @click="openModal()">
                                New Experience
                            </div>
                        </div> 
                    </div>

                    <div class="table">

                        <div class="table_filter">
                            <span class="table_filter-Btn ">
                                <i class="fas fa-ellipsis-h"></i>
                            </span>
                            <div>
                                <ul class="table_filter-list">
                                    <li>
                                        <p class="table_filter-link table_filter-link--active">
                                            All
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
            
                        <div class="table_search">
                            <div class="table_search-wrapper">
                                <select class="table_search-select" name="" id="">
                                    <option value="">Filter</option>
                                </select>
                            </div>
                            <div class="relative">
                                <i class="table_search-input--icon fas fa-search "></i>
                                <input class="table_search--input" type="text" placeholder="Search Experience">
                            </div>
                        </div>
            
                        <div class="experience_table-heading">
                            <p>Company</p> 
                            <p>Period</p>
                            <p>Position</p>
                            <p>Actions</p>
                        </div>
                        <!-- item 1 -->
                        <div class="experience_table-items"  v-for="item in experiences" :key="item.id"  v-if="experiences.length > 0">
                            <p>{{ item.company }}</p>
                            <p>{{ item.period }}</p>
                            <p>{{ item.position }}</p>
                            <div>
                                <button class="btn-icon success" @click="editExperience(item)">
                                    <font-awesome-icon :icon="['fas', 'pencil']" />
                                </button>
                                <button class="btn-icon danger"  @click="deleteExperience(item.id)" >
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </button>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <!-------------- EXPERIENCE MODAL --------------->
                <div class="modal main__modal" :class="{show : showModal}" >
                    <div class="modal__content">
                        <span class="modal__close btn__close--modal" @click="closeModal()" >×</span>
                        <h3 class="modal__title" v-show="editMode==false">Add Experience</h3>
                        <h3 class="modal__title" v-show="editMode==true">Update Experience</h3>
                        <hr class="modal_line"><br>
                        <div>
                            <p>Company</p>
                            <input type="text" class="input" v-model="form.company" />

                            <p>Period</p>
                            <input type="text" class="input" v-model="form.period"/>

                            <p>Position</p>
                            <input type="text" class="input" v-model="form.position"/>
                           
                        </div>
                        <br><hr class="modal_line">
                        <div class="model__footer">
                            <button class="btn mr-2 btn__close--modal" @click="closeModal()">
                                Cancel
                            </button>
                            <button class="btn btn-secondary btn__close--modal"  v-show="editMode==false"
                             @click="createExperience()">Save</button>
                            <button class="btn btn-secondary btn__close--modal"  v-show="editMode==true"
                             @click="updateExperience()">Update</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </main>
</template>