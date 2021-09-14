<template>
  <!-- //- div.ml-15.mt-10 home di customer====================== -->
  <div>
    <p>home di customer</p>
  </div>

</template>

<script>
// import Table from '@/common/components/Table'
import Button from '@/common/components/Button'

export default {
  name: 'CustomerHome',
  comments: {
    // Table,
    Button,
  },
  data: () => ({
    headers: [
      {
        text: 'Service Name', value: 'serviceName', align: 'start'
      },
      {
        text: 'Lab Name', value: 'labName'
      },
      {
        text: 'Date', value: 'date'
      },
      {
        text: 'Status', value: 'status'
      },
      {
        text: 'Actions', value: 'action'
      },
    ],
    items: [
      {
        serviceName: 'Covid-19 Testing',
        labName: 'GSI Lab',
        date: '20 Jan 2021',
        status: 'Registered'
      },
      {
        serviceName: 'Whole-Genome Sequencing',
        labName: 'Nebula Lab',
        date: '20 Jan 2021',
        status: 'Recieved by Lab'
      },
      {
        serviceName: 'Whole-Exome Sequencing',
        labName: 'Prodia',
        date: '20 Jan 2021',
        status: 'Quality Control'
      },
      {
        serviceName: 'Targeted Gene Panel Sequencing',
        labName: 'SpeedLab',
        date: '20 Jan 2021',
        status: 'Result Ready'
      },
      {
        serviceName: 'Covid-19 Testing',
        labName: '32andme',
        date: '20 Jan 2021',
        status: 'Rejected'
      },
    ]
  }),
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.degenics-datatable-card {
  border-radius: 8px !important;
  overflow: hidden !important;
  padding: 40px;

  box-shadow: unset !important;
  filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 0.07));

  width: 560px;
  height: 560;
}
// .cardHeadText {
//   margin-top: 5px;
// }
.cardTittle {
  font-size: 10px;
  // margin-top: 5px;
  padding: 1px;
}
.cardSubtittle {
  font-size: 10px;
  padding: 1px;
}
.btn-table {
  align-items: center;
}

.degenics-data-table {
  border-radius: 8px;
  overflow: hidden;
  margin-top: 24px;
  margin-bottom: 24px;

  /** BRI text-body */
  font-size: 10px;
  line-height: 13.5px;
  letter-spacing: 0.1px;
  /** */

  thead {
    background-color: #f5f7f9 !important;

    th {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      /* white-space: nowrap; */
      * {
        color: black !important;
        /** BRI text-body */
        font-size: 9px; //header font
        line-height: 15px;
        letter-spacing: 0.1px;
        /** */
      }
      i.v-icon.notranslate.v-data-table-header__icon:not(:hover) {
        opacity: 0.5;
      }
      &.active {
        i.v-icon.notranslate.v-data-table-header__icon {
          opacity: 1;
        }
      }
    }
  }
  tbody.tr.td {
    font-size: 7px;
  }

  .footer {
    height: 72px;

    .pagination-info {
      color: $color-text-secondary;
    }
    .v-pagination {
      button {
        font-size: 11px;
        min-width: 24px;
        height: 24px;
        outline: none;
        /* outline-color: $color-secondary; */
        &:not(.v-pagination__item--active) {
          background: $color-border;
        }
      }
      li:first-child, li:last-child {
        button {
          width: 24px;
        }
      }
    }
  }
}
</style>