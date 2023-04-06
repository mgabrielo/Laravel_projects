<script setup>
import { onMounted, ref } from 'vue';
import Base from '../layouts/base.vue'


const showModal = ref(false)
const hideModal = ref(true)

const editMode = ref(false)

let educations = ref([])
onMounted(async() =>{
    getEducations()
})

const getEducations = async()=>{
    let response = await axios.get('/api/get_all_education')
    educations.value = response.data.educations
}

const openModal =()=>{
    showModal.value =!showModal.value
}

const closeModal=()=>{
    showModal.value = !hideModal.value
    form.value =({})
    editMode.value = false
}

let form =ref({
    institution:'',
    period:'',
    degree:'',
    department:'',
})


const createEducation =async()=>{
    await axios.post('/api/create_education', form.value)
    .then(response=> {
        getEducations();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Education Added Successfully'
        })
    })
}

const editModal = (item)=> {
    editMode.value =true
    showModal.value = !showModal.value
    form.value = item
}


const updateEducation=async()=>{
    await axios.post('/api/update_education/'+form.value.id, form.value)
    .then(response=>{
        getEducations();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Education Updated Successfully'
        })
    })
}



const deleteEducation=(id)=>{
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
            axios.get('/api/delete_education/'+id)
            .then(()=>{
                Swal.fire(
                    'Delete',
                    'Education Delete is Successful',
                    'success'
                )
                getEducations();
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
            <section class="educations section" id="educations">
                <div class="skills_container">
                    <div class="titlebar">
                        <div class="titlebar_item">
                            <h1>Educations </h1>
                        </div>
                        <div class="titlebar_item">
                            <div class="btn" @click="openModal()">
                                New Education
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
                                <input class="table_search--input" type="text" placeholder="Search Education">
                            </div>
                        </div>
            
                        <div class="education_table-heading">
                            <p>Institution</p> 
                            <p>Period</p>
                            <p>Degree</p>
                            <p>Department</p>
                            <p>Actions</p>
                        </div>
                        <!-- item 1 -->
                        <div class="education_table-items" v-for="item in educations" :key="item.id"  v-if="educations.length > 0">
                            <p>{{ item.institution }}</p>
                            <p>{{ item.period }}</p>
                            <p>{{ item.degree }}</p>
                            <p>{{ item.department }}</p>
                            <div>
                                <button class="btn-icon success" @click="editModal(item)">
                                    <font-awesome-icon :icon="['fas', 'pencil']" />
                                </button>
                                <button class="btn-icon danger" @click="deleteEducation(item.id)">
                                    <font-awesome-icon :icon="['fas', 'trash']"  />
                                </button>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <!-------------- EDUCATION MODAL --------------->
                <div class="modal main__modal"   :class="{show : showModal}">
                    <div class="modal__content">
                        <span class="modal__close" @click="closeModal()">×</span>
                        <h3 class="modal__title" v-show="editMode==false">Add Education</h3>
                        <h3 class="modal__title" v-show="editMode==true">Update Education</h3>
                        <hr class="modal_line"><br>
                        <div>
                            <p>Institution</p>
                            <input type="text" class="input" v-model="form.institution"/>

                            <p>Period</p>
                            <input type="text" class="input"  v-model="form.period" />

                            <p>Degree</p>
                            <input type="text" class="input" v-model="form.degree"/>

                            <p>Department</p>
                            <input type="text" class="input" v-model="form.department"/>
                           
                        </div>
                        <br><hr class="modal_line">
                        <div class="model__footer">
                            <button class="btn mr-2 btn__close--modal" @click="closeModal()">
                                Cancel
                            </button>
                            <button class="btn btn-secondary btn__close--modal"  v-show="editMode==false"
                             @click="createEducation()">Save</button>
                            <button class="btn btn-secondary btn__close--modal" v-show="editMode==true"
                             @click="updateEducation()">Update</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>