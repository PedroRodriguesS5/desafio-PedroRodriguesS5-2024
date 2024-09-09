import { animais } from "./animais";
import { recintos } from "./recintos";
class RecintosZoo {


    
    analisaRecintos(animal, quantidade) {
        const acharAnimal = animais.find(a => a.especie == animal);
    
        // Validação de animal e quantidade
        if (!acharAnimal) {
            return { erro: "Animal inválido", recintos: null };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintos: null };
        }
    
        const recintosViaveis = recintos.filter(recinto => {
            // Verificando bioma adequado
            const acharBiomaIgual = acharAnimal.bioma.some(b => recinto.bioma.includes(b));
            if (!acharBiomaIgual) return false;;
    
            const espacoOcupado = recinto.animais_existentes.reduce((acc, a) => acc + a.quantidade * this.getTamanhoAnimal(a.especie), 0);
            const espacoNecessario = quantidade * acharAnimal.tamanho;
    
            // Verificando espaço disponível
            if (recinto.tamanho_total - espacoOcupado < espacoNecessario) return false;
    
            // Carnívoros só podem ficar com a própria espécie

            if (acharAnimal.carnivoro && recinto.animais_existentes.length > 0 || this.getAnimalCarnivoro(recinto)) {
                const diferentesEspecies = recinto.animais_existentes.some(a => a.especie !== animal);
                if (diferentesEspecies) return false;
            }
    
            // Regra para macacos: não podem ficar sozinhos em um recinto vazio
            if (animal === "MACACO" && quantidade === 1 && recinto.animais_existentes.length === 0) return false;
    
    
            // Considerar espaço extra se houver mais de uma espécie
            const maisDeUmaEspecie = recinto.animais_existentes.length > 0 && recinto.animais_existentes.some(a => a.especie !== animal);
            const espacoExtra = maisDeUmaEspecie ? 1 : 0;
    
            return recinto.tamanho_total - espacoOcupado >= espacoNecessario + espacoExtra;
        }).map(recinto => {
            // Calculando espaço livre após incluir o animal
            const espacoOcupado = recinto.animais_existentes.reduce((acc, a) => acc + a.quantidade * this.getTamanhoAnimal(a.especie), 0);
            const espacoLivre = recinto.tamanho_total - (espacoOcupado + quantidade * acharAnimal.tamanho);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho_total})`;
        });
    
        // Verifica se há recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintos: null };
        }
    
        return { recintosViaveis };
    }

    getTamanhoAnimal(especie) {
        const animal = animais.find(a => a.especie === especie);
        return animal ? animal.tamanho : 0;
    }

    getAnimalCarnivoro(recinto){
      const animalCarnivoro = recinto.animais_existentes.find(animal => {
        const infoAnimal = animais.find(a => a.especie === animal.especie);
        return infoAnimal && infoAnimal.carnivoro;
    });
    return animalCarnivoro ? true : false;
}
}

export { RecintosZoo as RecintosZoo };
