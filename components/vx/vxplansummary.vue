<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
    <!-- Account -->

    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        Account
      </div>
      <div class="text-xl font-semibold" style="color: #c7d2fe">
        {{ root?.data?.vxCode || "-" }}
      </div>
    </div>

    <!-- Vx income -->
    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        Vx income
      </div>
      <div class="text-xl font-semibold" style="color: #c7d2fe">
        ${{ format(userInfo?.referralBalance) }}
      </div>
    </div>

    
    <!-- Direct service -->
    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        Direct service
        {{ root?.children[0]?.data?.vxCode }}
      </div>
    
      <div class="text-sm text-gray-600" style="color: #c7d2fe">
        <p>
          LeftReferral: {{ root?.children[0]?.data?.vxCode }} 
        </p>
        <p>
          RightReferral: {{ root?.children[1]?.data?.vxCode }} 
        </p>
      </div>
    </div>


    <!-- Line investment -->
    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        Line investment
      </div>
      <div class="text-xl font-semibold" style="color: #c7d2fe">
        ${{ format(root?.data?.totalTeamVolume) }}
      </div>
      <div class="text-sm text-gray-600" style="color: #c7d2fe">
        <p>
          LeftVolume: ${{ format(root?.data?.leftVolume) }} , LeftCount:
          {{ format(root?.data?.leftCount) }}
        </p>
        <p>
          RightVolume: ${{ format(root?.data?.rightVolume) }} , RightCount:
          {{ format(root?.data?.RightCount) }}
        </p>
      </div>
    </div>

    <!-- Flush Out -->
    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        VX cycle
      </div>

      <div class="text-sm text-gray-600" style="color: #c7d2fe">
        <!-- Cycles:   {{ root }} -->
      </div>
    </div>

    <!-- Account Capacity -->
    <div
      class="bg-white shadow rounded p-4"
      style="background: #0f172a; color: #c7d2fe"
    >
      <div class="text-xs uppercase text-gray-500" style="color: #c7d2fe">
        Account Capacity (3x)
      </div>
      <div class="text-xl font-semibold" style="color: #c7d2fe">
        ${{ format(userInfo?.maxCapBalance || 0) }}
      </div>
      <div class="text-sm text-gray-600" style="color: #c7d2fe">
        Used: ${{ format(userInfo?.withdrawalTotalBalance || 0) }} / Remaining:
        ${{
          format(
            (userInfo?.maxCapBalance || 0) -
              (userInfo?.withdrawalTotalBalance || 0),
          )
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  root: {
    type: Object,
    required: true,
  },

  userInfo: {
    type: Object,
    required: true,
  },
});

/* helper */
const format = (v) => Number(v || 0).toLocaleString("en-US");
</script>
