<script setup>

    import DetailsIcon from '@/pics/visible.png'

    const props = defineProps({
        indexState: {
            type: Number
        }, 
        columns: {
            type: Array
        }
    })



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
        <tr v-for="(report, index) in REPORTS_FACTURADOS" :key="index">
            <td>
            {{ index + 1 }}
            </td>

            <template v-for="head in HEADERS" :key="head.title">
            <!-- Si no tiene children y está visible -->
            <template v-if="!head.children && !props.columns.includes(head.value)">
                <td>
                {{ report[head.title] ?? '—' }}
                </td>
            </template>

            <!-- Si tiene children -->
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
                        {{ report[head.title].map(item => item[child.title]).join(' ; ') }}
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
    <div class="d-flex justify-center ma-2">
          <v-btn @click="DATA_FILTER" size="large" class="bg-blue">
                PRUEBA
          </v-btn>
    </div>
</template>