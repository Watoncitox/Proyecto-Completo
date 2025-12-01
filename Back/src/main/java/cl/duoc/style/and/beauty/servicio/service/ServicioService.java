package cl.duoc.style.and.beauty.servicio.service;

import cl.duoc.style.and.beauty.servicio.dto.ServicioDTO;
import cl.duoc.style.and.beauty.servicio.dto.ServicioRequestDTO;
import cl.duoc.style.and.beauty.servicio.model.CategoriaServicio;
import cl.duoc.style.and.beauty.servicio.model.Servicio;
import cl.duoc.style.and.beauty.servicio.repository.CategoriaServicioRepository;
import cl.duoc.style.and.beauty.servicio.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;
    private final CategoriaServicioRepository categoriaRepository;

    public ServicioService(ServicioRepository servicioRepository,
                           CategoriaServicioRepository categoriaRepository) {
        this.servicioRepository = servicioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    private ServicioDTO toDTO(Servicio s) {
        ServicioDTO dto = new ServicioDTO();
        dto.setId(s.getId());
        dto.setNombre(s.getNombre());
        dto.setDescripcion(s.getDescripcion());
        dto.setDuracionMin(s.getDuracionMin());
        dto.setPrecio(s.getPrecio());
        dto.setImagenUrl(s.getImagenUrl());

        dto.setCategoriaId(s.getCategoria().getId());
        dto.setCategoriaNombre(s.getCategoria().getNombre());
        return dto;
    }

    public List<ServicioDTO> findAll() {
        return servicioRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ServicioDTO save(ServicioRequestDTO dto) {
        CategoriaServicio cat = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Servicio s = new Servicio();
        s.setCategoria(cat);
        s.setNombre(dto.getNombre());
        s.setDescripcion(dto.getDescripcion());
        s.setDuracionMin(dto.getDuracionMin());
        s.setPrecio(dto.getPrecio());
        //s.setImagenUrl(dto.getImagenUrl());

        return toDTO(servicioRepository.save(s));
    }

    public ServicioDTO findById(Long id) {
        return servicioRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

}
