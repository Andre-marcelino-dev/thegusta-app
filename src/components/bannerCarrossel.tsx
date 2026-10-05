import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, View } from "react-native";

import bannerCarrosselStyle from "@/styles/bannerCarrosselStyle";
import { API_BASE_URL } from "@/utils/categorias";

const TEMPO_TROCA = 4000; // tempo de cada banner na tela (ms)

type Banner = {
    id: number;
    nome: string;
    imagem: string;
};

type BannerApi = {
    id_banner: number;
    nome_banner: string;
    foto_banner: string;
    status_banner: "ATIVO" | "INATIVO";
    ordem_banner: number;
};

export default function BannerCarrossel() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [largura, setLargura] = useState(0);
    const [atual, setAtual] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    // Carregar os banners da API
    useEffect(() => {
        async function carregarBanners() {
            try {
                const resposta = await fetch(`${API_BASE_URL}/api/v1/banners`);
                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status} ao buscar banners`);
                }
                const json = await resposta.json();
                const bannersAtivos: Banner[] = json.data
                    .filter((banner: BannerApi) => banner.status_banner === "ATIVO")
                    .sort((a: BannerApi, b: BannerApi) => a.ordem_banner - b.ordem_banner)
                    .map((banner: BannerApi) => ({
                        id: banner.id_banner,
                        nome: banner.nome_banner,
                        imagem: `${API_BASE_URL}/davilla/images/banner/${encodeURIComponent(banner.foto_banner)}`,
                    }));
                setBanners(bannersAtivos);
            } catch (erro) {
                console.error("Erro ao carregar banners:", erro);
            }
        }

        carregarBanners();
    }, []);

    // Passa para o próximo banner sozinho; volta ao primeiro depois do último.
    // Reinicia a contagem quando o usuário arrasta (o "atual" muda).
    useEffect(() => {
        if (banners.length < 2 || largura === 0) return;
        const timer = setTimeout(() => {
            const proximo = (atual + 1) % banners.length;
            scrollRef.current?.scrollTo({ x: proximo * largura, animated: true });
            setAtual(proximo);
        }, TEMPO_TROCA);
        return () => clearTimeout(timer);
    }, [atual, banners.length, largura]);

    if (banners.length === 0) return null;

    return (
        <View
            style={bannerCarrosselStyle.container}
            onLayout={(evento) => setLargura(evento.nativeEvent.layout.width)}
        >
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(evento) => {
                    if (largura === 0) return;
                    setAtual(Math.round(evento.nativeEvent.contentOffset.x / largura));
                }}
            >
                {banners.map((banner) => (
                    <Image
                        key={banner.id}
                        style={[bannerCarrosselStyle.imagem, { width: largura }]}
                        source={{ uri: banner.imagem }}
                        resizeMode="cover"
                        accessibilityLabel={banner.nome}
                    />
                ))}
            </ScrollView>

            <View style={bannerCarrosselStyle.indicadores}>
                {banners.map((banner, indice) => (
                    <View
                        key={banner.id}
                        style={[
                            bannerCarrosselStyle.bolinha,
                            indice === atual && bannerCarrosselStyle.bolinhaAtiva,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}
