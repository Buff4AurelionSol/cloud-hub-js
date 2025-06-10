<script setup>

    import DetailsIcon from '@/pics/visible.png'

    const props = defineProps({
        indexState: {
            type: Number
        }, 
        columns: {
            type: Array
        },
        typeTable:{
            type: String 
        },
        dataTable: {
            type: Object
        }
    })

    const tableData = computed(() => props.dataTable)



</script>

<template>
    <v-table class="table-container box-filters-fade rounded-xl">
        <thead>
            <tr>
                 <th>
                    #
                </th>
                <template v-for="head in HEADERS" :key="head.title">
                    <template v-if="!head.children && !props.columns.includes(head.value)">                   
                        <th :key="head.title">
                            {{head.value }}
                        </th>
                    </template>
                    <template v-else v-for="child in head.children" :key="child.title">
                      <template v-if="!props.columns.includes(child.value)">
                          <th>{{ child.value }}</th>
                      </template>
                    </template>
                </template>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(report, index) in tableData" :key="index">
            <td>
            {{ index + 1 }}
            </td>

            <template v-for="head in HEADERS" :key="head.title">
           
            <template v-if="!head.children && !props.columns.includes(head.value)">
                <td>
                {{ report[head.title] }}
                </td>
            </template>

            <template v-else>
                <template v-for="child in head.children" :key="child.title">
                    <template v-if="!props.columns.includes(child.value)">
                        <td>
                        <template v-if="child.title === 'contrato'">
                            <div class="d-flex flex-column ga-1">
                            <v-chip
                                v-for="(item, i) in report[head.title]"
                                class="bg-blue"
                                :class="{ 'mb-1': i === report[head.title].length - 1 }"
                            >
                                {{ item[child.title] }}
                            </v-chip>
                            </div>
                        </template>

                        <template v-else>
                            {{ report[head.title]?.map(item => item[child.title])?.join(' ; ') }}
                        </template>
                        </td>
                    </template>
                    </template>
                </template>
            </template>

            <td>
                <Modal :image-icon="DetailsIcon" :reportData="report" />
            </td>
        </tr>
        </tbody>
    </v-table>
</template>

<style>
  
  td{
    font-size: small;
  }

  th{
    font-size: small;
  }

  .table-container {
    padding: 20px;
    overflow-x: auto;
  }

  .box-icon{
    width: 30px;
    height: 30px;
  }

  .not-found{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-filters-fade{
    animation: fade-down 2s normal;
  }


    @keyframes fade-down{
    from{
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to{
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

</style>
