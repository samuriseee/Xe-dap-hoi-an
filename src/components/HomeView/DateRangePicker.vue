<template>
  <date-picker
    class="date-picker"
    ref="picker"
    :opens="opens"
    :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
    :minDate="minDate"
    :singleDatePicker="singleDatePicker"
    :timePicker="timePicker"
    :timePicker24Hour="timePicker24Hour"
    :showWeekNumbers="showWeekNumbers"
    :showDropdowns="showDropdowns"
    :showRanges="false"
    :autoApply="autoApply"
    :alwaysShowCalendars="true"
    v-model="dateRange"
    @update="updateValues"
    @start-selection="logEvent('event: startSelection', $event)"
    @finish-selection="logEvent('event: finishSelection', $event)"
    :linkedCalendars="linkedCalendars"
  >
    {{ dateRange.startDate }} - {{ dateRange.endDate }}
    <template v-slot:input="picker">
      {{ picker.startDate | date }} - {{ picker.endDate | date }}
    </template>
  </date-picker>
</template>
  
  <script>
import DatePicker from "vue2-daterange-picker";
import moment from "moment";
export default {
  components: {
    DatePicker,
  },

  data() {
    return {
      opens: "center",
      minDate: new Date(),
      // minDate: '',
      // maxDate: '',
      dateRange: {
        startDate: null,
        endDate: null,
      },
      singleDatePicker: false,
      timePicker: true,
      timePicker24Hour: true,
      showDropdowns: true,
      autoApply: false,
      showWeekNumbers: true,
      linkedCalendars: true,
    };
  },
  methods: {
    updateValues(values) {
      this.dateRange.startDate = moment(values.startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dateRange.endDate = moment(values.endDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.$store.commit("setDatetimepicker", this.dateRange);
      console.log("event: update", values);
    },
    checkOpen(open) {
      console.log("event: open", open);
    },
  },
  filters: {
    date(value) {
      if (!value) return "";
      return new Date(value).toLocaleString();
    },
  },
};
</script>

<style >
.date-picker {
  border: none;
  margin-left: 12px;
  outline: none;
  text-align: left;
  font-weight: 600;
  height: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  color: #0000 !important;
}
.daterangepicker .calendars-container {
  margin: 0 auto;
}
.calendars {
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 16px !important;
  color: black !important;
}
.daterangepicker .drp-buttons .btn {
  display: inline-block;
  padding: 0 12px;
  border-radius: 100px;
  background: #d70000;
  color: #fff;
  font-size: 16px;
}
.daterangepicker .btn-secondary {
  background-color: #6c757d !important;
}
.daterangepicker td.active,
.daterangepicker td.active:hover {
  background-color: #d70000 !important;
}
.daterangepicker td.in-range {
  background-color: #fdd5d5;
}
.reportrange-text {
  color: black;
  border-radius: 12px;
  padding: 10px;
}
</style>
  
