<script setup>
import Base from '../layouts/base.vue'
import { onMounted, ref, toDisplayString } from 'vue';


let skills = ref([])
const showModal = ref(false)
const hideModal = ref(true)
let services = ref([])
const editMode = ref(false)
onMounted(async() =>{
    getSkills()
    getServices()
})

const getSkills = async()=>{
    let response = await axios.get('/api/get_all_skill')
    // console.log('response',response)

    skills.value = response.data.skills
}

const getServices =async()=>{
    let response = await axios.get('/api/get_all_service')
    services.value = response.data.services

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
    name:'',
    proficiency:'',
    service_id:'',
})


const createSkill =async()=>{
    await axios.post('/api/create_skill', form.value)
    .then(response=> {
        getSkills();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Skill Added Successfully'
        })
    })
}


const editModal = (item)=> {
    editMode.value =true
    showModal.value = !showModal.value
    form.value = item
}


const updateSkill=async()=>{
    await axios.post('/api/update_skill/'+form.value.id, form.value)
    .then(response=>{
        getSkills();
        closeModal();
        toast.fire({
            icon: 'success',
            title : 'Skill Updated Successfully'
        })
    })
}


const deleteSkill=(id)=>{
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
            axios.get('/api/delete_skill/'+id)
            .then(()=>{
                Swal.fire(
                    'Delete',
                    'Skill Delete is Successful',
                    'success'
                )
                getSkills();
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
          <!--==================== SKILLS ====================-->
          <section class="skills section" id="skills">
                <div class="skills_container">
                    <div class="titlebar">
                        <div class="titlebar_item">
                            <h1>Skills </h1>
                        </div>
                        <div class="titlebar_item">
                            <div class="btn" @click="openModal()">
                                New Skill
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
                                <input class="table_search--input" type="text" placeholder="Search Skills">
                            </div>
                        </div>
            
                        <div class="skill_table-heading">
                            <p>Name</p> 
                            <p>Proficiency</p>
                            <p>Service</p>
                            <p>Actions</p>
                        </div>
                        <!-- item 1 -->
                        <div class="skill_table-items" v-for="item in skills" :key="item.id"  v-if="skills.length > 0" >
                            <p>{{ item.name }}</p>
                            <div class="table_skills-bar">
                                 <span class="table_skills-percentage" :style="{'width' : `${item.proficiency}%`}"></span>
                                 <strong>{{ item.proficiency }}</strong>
                            </div>
                            <p v-if="item.service">{{ item.service.name }}</p>
                            <div>
                                <button class="btn-icon success" @click="editModal(item)">
                                    <font-awesome-icon :icon="['fas', 'pencil']" />
                                </button>
                                <button class="btn-icon danger" @click="deleteSkill(item.id)" >
                                    <font-awesome-icon :icon="['fas', 'trash']"   />
                                </button>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <!-------------- SERVICES MODAL --------------->
                <div class="modal main__modal" :class="{show : showModal}" >
                    <div class="modal__content">
                        <span class="modal__close btn__close--modal" @click="closeModal()" >×</span>
                        <h3 class="modal__title" v-show="editMode == false">Add Skill</h3>
                        <h3 class="modal__title" v-show="editMode == true">Update Skill</h3>
                        <hr class="modal_line"><br>
                        <div>
                            <p>Name</p>
                            <input type="text" class="input" v-model="form.name"/>

                            <p>Proficiency</p>
                            <input type="text" class="input"  v-model="form.proficiency"/>
                           
                            <p>Service</p>
                            <select class="inputSelect" name="" id="" v-model="form.service_id">
                                <option disabled>Select Service</option>
                                <option :value="service.id" v-for="service in services" :key="service.id">
                                    {{ service.name }}
                                </option>
                            </select>
                        </div>
                        <br><hr class="modal_line">
                        <div class="model__footer">
                            <button class="btn mr-2 btn__close--modal" @click="closeModal()">
                                Cancel
                            </button>
                            <button class="btn btn-secondary btn__close--modal " v-show="editMode ==false"
                             @click="createSkill()">Save</button>
                            <button class="btn btn-secondary btn__close--modal " v-show="editMode ==true"
                             @click="updateSkill()">Update</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>    
</template>