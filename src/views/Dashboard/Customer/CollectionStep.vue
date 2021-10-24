<template lang="pug">
  
</template>

<script>
import {
  cottonSwabIcon,
  scissorIcon,
  glassCupIcon,
  latexGlovesIcon,
  penIcon,
  smallPaperEnvelopeIcon,
  largePaperEnvelopeIcon,
  collectionStep1,
  collectionStep2,
  collectionStep3,
  collectionStep4,
  collectionStep5,
  collectionStep6,
  collectionStep7,
  collectionStep8,
  collectionStep9,
  collectionStep10,
  collectionStep11,
  collectionStep12,
  collectionStep13
} from "@/common/icons"
import Button from "@/common/components/Button"

export default {
  name: "CollectionSteps",
  components: { Button },
  data: () => ({
    cottonSwabIcon,
    scissorIcon,
    glassCupIcon,
    latexGlovesIcon,
    penIcon,
    smallPaperEnvelopeIcon,
    largePaperEnvelopeIcon,
    collectionStep1,
    collectionStep2,
    collectionStep3,
    collectionStep4,
    collectionStep5,
    collectionStep6,
    collectionStep7,
    collectionStep8,
    collectionStep9,
    collectionStep10,
    collectionStep11,
    collectionStep12,
    collectionStep13,
    swabDetail: [
      {
        name: "cuttonSwab", detail: "4 cotton swabs (Q-tips)"
      },
      {
        name: "scissor", detail: "1 pair of sharp scissors"
      },
      {
        name: "glassCup", detail: "1 glass cup"
      },
      {
        name: "latexGloves", detail: "1 pair of disposable gloves"
      },
      {
        name: "smallPaperEnvelope", detail: "1 small paper envelope"
      },
      {
        name: "largePaperEnvelope", detail: "1 large paper envelope"
      },
      {
        name: "pen", detail: "1 pen"
      }
    ],
    dnaCollectionDetail: [
      {
        name: "step1",
        detail: "Refrain from eating, drinking, chewing gum, brushing teeth, or smoking for at least 60 minutes before sample collection"
      },
      {
        name: "step2",
        detail: "Rinse your mouth with water. Make sure you swish the water for at least 30 seconds before spitting it out. Repeat. Observe the color. If the water appears colored, repeat rinsing with water until clear"
      },
      {
        name: "step3",
        detail: " prior to handling envelopes or cotton swabs to avoid contamination",
        ref: "Wash your hands properly"
      },
      {
        name: "step4",
        detail: "Put on disposable gloves and wear them throughout the entire collection procedure to protect DNA integrity"
      },
      {
        name: "step5",
        detail: "Carefully take a clean cotton swab from the package, grasp only the stem, and pull the swab out. Avoid touching the tips"
      },
      {
        name: "step6",
        detail: "Using sharp scissors, cut the head of one side of the cotton bud (Q-tip), so we know which side of the cotton bud contains the DNA! You will need a total of 4 cotton swabs per person"
      },
      {
        name: "step7",
        detail: "After you have cut the head of the cotton swabs on one side, hold the handles of 3 cotton swabs in one hand. Using the other hand, rub and rotate rigorously one cotton swab along the inside of each cheek for 30 seconds (1 minute total per swab), ensuring that the entire swab tip has made contact with the cheek to ensure maximum cell collection"
      },
      {
        name: "step8",
        detail: "Remove swab, do not touch swab tip against teeth, lips, or other surfaces; Place the swab upright in a clean glass, ensuring that the end of the swab is not touching anything else"
      },
      {
        name: "step9",
        detail: "Repeat steps 7 and 8 using the rest of the cotton swabs you have prepared earlier"
      },
      {
        name: "step10",
        detail: "Allow the swab a MINIMUM of 60 minutes to dry."
      },
      {
        name: "step11",
        detail: "Put the dried swabs (cotton tip side down) directly into the small paper envelope. This will enable the swabs to dry out and help preserve the DNA. Seal the envelope. ",
        sub:"NEVER place any of the samples in plastic bags or plastic tubes. The samples should be air-dried and placed in paper envelopes and NEVER in any sort of culture media. PLACING THE SAMPLES IN A PLASTIC BAG WILL DESTROY THE SAMPLES!!"
      },
      {
        name: "step12",
        detail: "Write your specimen number and collection date on the small envelope"
      },
      {
        name: "step13",
        detail: "Place the small envelope into the large envelope for shipping, Write down the selected nearby lab’s address on the large envelope and ship it immediately.",
        sub: "You do not need to mention your name, address, or any personal information anywhere"
      }
    ]
  }),

  methods: {
    swabIcon(name) {
      if (name == "cuttonSwab") {
        return this.cottonSwabIcon
      }
      if (name == "scissor") {
        return this.scissorIcon
      }
      if (name == "glassCup") {
        return this.glassCupIcon
      }
      if (name == "latexGloves") {
        return this.latexGlovesIcon
      }
      if (name == "smallPaperEnvelope") {
        return this.smallPaperEnvelopeIcon
      }
      if (name == "largePaperEnvelope") {
        return this.largePaperEnvelopeIcon
      }
      if (name == "pen") {
        return this.penIcon
      }
    },

    dnaIcon(name) {
      if (name == "step1") {
        return this.collectionStep1
      }
      if (name == "step2") {
        return this.collectionStep2
      }
      if (name == "step3") {
        return this.collectionStep3
      }
      if (name == "step4") {
        return this.collectionStep4
      }
      if (name == "step5") {
        return this.collectionStep5
      }
      if (name == "step6") {
        return this.collectionStep6
      }
      if (name == "step7") {
        return this.collectionStep7
      }
      if (name == "step8") {
        return this.collectionStep8
      }
      if (name == "step9") {
        return this.collectionStep9
      }
      if (name == "step10") {
        return this.collectionStep10
      }
      if (name == "step11") {
        return this.collectionStep11
      }
      if (name == "step12") {
        return this.collectionStep12
      }
      if (name == "step13") {
        return this.collectionStep13
      }
    }
  }
}
</script>

<style lang="sass">
  @import "@/common/styles/mixins.sass"

  .headerTitle
    text-align: center
    font-size: 25px

  .firstBody
    margin: 0 0 35px 0 !important

  .swabCard
    text-align: center
    font-size: 12px
    max-width: 125px

  .secondBody
    margin: 5px 0 0 0

  .dnaCard
    font-size: 12px
    margin: 3px 0 0 0
    max-width: 60%

  .bodyContent
    margin: 40px 0 0 0 !important

  .dnaBox
  
  .leftSide
    width: 100px !important
  .rightSide
  
  .download
    align: center
</style>
