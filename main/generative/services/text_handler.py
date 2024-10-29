
class SummaryService:
    def __init__(self, model):
        self.model = model

    def execute(self, text):
        response = self.model.generate_content([text])
        return response.text


class ChatService:
    def __init__(self, model, topic=None, context=None):
        self.model = model
        self.history_log = []
        self.init_chat = None
        self.setup_chat(
            topic="Reproduction in Biology",
            context="Reproduction in Biology\nReproduction is a fundamental biological process through which organisms produce offspring, ensuring the continuity of their species. It plays a crucial role in the survival, evolution, and diversity of life on Earth. This process can occur in multiple ways, each adapted to the specific needs and environmental conditions of different organisms. In this comprehensive overview, we will explore the types, mechanisms, and significance of reproduction, as well as reproductive strategies in plants, animals, and microorganisms.\n\nTypes of Reproduction\nReproduction can be broadly classified into two main types:\n\nAsexual Reproduction\nSexual Reproduction\n1. Asexual Reproduction\nIn asexual reproduction, a single parent gives rise to offspring without the involvement of gametes (sperm and egg). The offspring are genetically identical to the parent, barring any mutations, and are called clones.\n\nTypes of Asexual Reproduction\nBinary Fission: Common in prokaryotes like bacteria and some protozoans (e.g., Amoeba). The parent cell splits into two identical daughter cells.\nBudding: A small bud forms on the parent organism, eventually detaching to become an independent organism (e.g., Hydra, yeast).\nFragmentation: The parent body breaks into several pieces, each capable of growing into a new individual (e.g., Planaria, sponges).\nVegetative Propagation: Plants reproduce from roots, stems, or leaves (e.g., potatoes from tubers, strawberries from runners).\nSpore Formation: Organisms like fungi release spores that grow into new individuals under favorable conditions.\nAdvantages of Asexual Reproduction\nFaster reproduction process.\nRequires only one parent, making it energy-efficient.\nEffective in stable environments with little need for genetic variation.\nDisadvantages of Asexual Reproduction\nLack of genetic diversity, making species vulnerable to diseases and environmental changes.\n2. Sexual Reproduction\nSexual reproduction involves the fusion of specialized reproductive cells called gametes (sperm and egg) from two parents. This process results in offspring that inherit genetic material from both parents, leading to greater genetic diversity.\n\nProcess of Sexual Reproduction\nGamete Formation: Involves meiosis, where the chromosome number is halved to produce haploid cells (sperm and eggs).\nFertilization: The male and female gametes fuse to form a diploid zygote.\nEmbryonic Development: The zygote undergoes multiple cell divisions and differentiation to form an embryo.\nBirth or Germination: In animals, the embryo develops into a fetus and is born. In plants, the zygote may develop into a seed, which germinates to grow into a new plant.\nAdvantages of Sexual Reproduction\nIntroduces genetic diversity, which promotes adaptation and evolution.\nProvides resilience against diseases and environmental changes.\nDisadvantages of Sexual Reproduction\nRequires more energy and time.\nDependence on two parents can limit reproductive success in certain environments.\nReproduction in Plants\nPlants reproduce both sexually and asexually. Their reproductive mechanisms depend on whether they are flowering or non-flowering plants.\n\nAsexual Reproduction in Plants\nVegetative Propagation: Includes methods such as cutting, grafting, and layering. Examples include potatoes growing from tubers and onions from bulbs.\nApomixis: Some plants can produce seeds without fertilization, leading to offspring identical to the parent (e.g., dandelions).\nSexual Reproduction in Plants\nFlower Structure: Flowers contain reproductive organs — stamens (male) and carpels (female).\nPollination: Transfer of pollen from the anther (male) to the stigma (female). It can be:\nSelf-pollination: Pollen from the same plant fertilizes the ovule.\nCross-pollination: Pollen from one plant fertilizes the ovule of another.\nFertilization: The pollen tube grows down to the ovule, allowing sperm to fertilize the egg, forming a zygote.\nSeed Formation and Dispersal: The zygote develops into a seed, which is dispersed by wind, water, or animals.\nReproduction in Animals\nAnimals use sexual reproduction as the primary means of producing offspring, though some species also exhibit asexual reproduction.\n\nAsexual Reproduction in Animals\nParthenogenesis: In some species, females produce offspring from unfertilized eggs (e.g., some lizards and bees).\nBudding and Fragmentation: Seen in organisms like Hydra and starfish.\nSexual Reproduction in Animals\nInternal Fertilization: Sperm fertilizes the egg inside the female body (e.g., mammals, reptiles, and birds).\nExternal Fertilization: Gametes are released into the environment, where fertilization occurs (e.g., fish and amphibians).\nReproductive Strategies and Adaptations\nOrganisms adopt different reproductive strategies based on environmental pressures and life cycles. These strategies ensure survival and reproduction in varying conditions.\n\nR-Strategists and K-Strategists\nR-Strategists: Produce many offspring with minimal parental care (e.g., insects, fish). Their strategy focuses on quantity over quality.\nK-Strategists: Produce fewer offspring with extensive parental care (e.g., humans, elephants). Their strategy emphasizes offspring survival.\nHermaphroditism\nSome animals, like earthworms and snails, are hermaphrodites, meaning they have both male and female reproductive organs. This adaptation ensures reproductive success, especially in environments where mates are scarce.\n\nReproduction in Microorganisms\nMicroorganisms exhibit diverse reproductive mechanisms, often adapted for rapid growth and survival under changing conditions.\n\nAsexual Reproduction in Microorganisms\nBinary Fission: Common in bacteria and protists.\nMultiple Fission: Some protozoa, like Plasmodium, produce several offspring simultaneously.\nSpore Formation: Fungi and bacteria form spores that withstand harsh conditions.\nSexual Reproduction in Microorganisms\nConjugation: Exchange of genetic material between bacterial cells through a pilus.\nSyngamy: Fusion of gametes in some protists, like algae.\nSignificance of Reproduction\nReproduction is essential for the survival of species and the maintenance of ecosystems. It also plays a key role in:\n\nEvolution: Genetic variation through sexual reproduction drives natural selection and adaptation.\nBiodiversity: Reproductive mechanisms contribute to the variety of life forms on Earth.\nPopulation Control: Reproductive rates influence population size and dynamics.\n\n\nThe topic of the content is: Reproduction in Biology. "
        )
        
    def setup_chat(self, topic, context):
        self.init_chat = [
			{
				"role": "user",
				"parts": [
                    "Chat ID: 1",
                    f"Topic: {topic}",
					f"Context: {context}",
                    "The topic we are taking throughout this chat is {topic}",
				],
			},
			{
				"role": "model",
				"parts": [
				    f"Okay the topic we are taking throughout this chat is {topic}. \nNoted",
				],
			}
		]
		

    def add_to_history(self, session=None):
        if session:
            chat_count = 2
            for chat in session:
                if chat['role'] == 'user':
                    user_chat = chat['parts']
                    user_chat.insert(0, "According To The Topic in Chat ID 1 answer user question below")
                    user_chat.insert(0, f"Chat ID: {chat_count}")
                    self.history_log.append({"role": f"{chat['role']}", "parts": user_chat})
                    chat_count += 1
                else:
                    self.history_log.append({"role": f"{chat['role']}", "parts": f"{chat['parts']}"})
                    
    def chat(self, message, session):
        self.history_log = self.init_chat
        self.add_to_history(session=session)
        chat_session = self.model.start_chat(
			history=self.history_log
		)
        message.insert(0, "According To The Topic in Chat ID 1 answer user question below")
        response = chat_session.send_message(message)
        return response.text

    
    def execute(self, text=None, session=[]):
        text = input("User: ")
        print("")
        user_chat = {
			"role": "user",
			"parts": [text,]
		}
        res = self.chat([text], session=session)
        print("Model: ", res)
        model_chat = {
			"role": "model",
			"parts": [res,]
		}
        session.append(user_chat)
        session.append(model_chat)
        return (self, res)
            